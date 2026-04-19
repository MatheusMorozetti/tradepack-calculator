import { useState, useMemo, useEffect } from "react";
import { supabase } from "./supabase";

// tabId único por aba — gerado no nível do módulo, acessível por todos os componentes
const tabId = (() => {
  let id = sessionStorage.getItem("tabId");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem("tabId", id);
  }
  return id;
})();

// ── LOGIN COM SUPABASE ─────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState("login"); // "login" | "forgot" | "otp" | "newpassword"
  const [emailRecovery, setEmailRecovery] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const handleSubmit = async () => {
    if (!email || !senha) { setErro("Preencha email e senha."); return; }
    setLoading(true); setErro("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) { setErro("Email ou senha incorretos."); setLoading(false); return; }
    const { data: profile, error: profileError } = await supabase
      .from("profiles").select("*").eq("id", data.user.id).single();
    if (profileError || !profile) {
      await supabase.auth.signOut();
      setErro("Perfil não encontrado. Contate o suporte.");
      setLoading(false); return;
    }
    if (!profile.active) {
      await supabase.auth.signOut();
      setErro("Acesso suspenso. Contate o suporte.");
      setLoading(false); return;
    }
    if (new Date(profile.expires_at) < new Date()) {
      await supabase.auth.signOut();
      setErro("Acesso expirado. Renove sua assinatura.");
      setLoading(false); return;
    }
    const { error: upsertError } = await supabase.from("active_sessions").upsert({
      user_id: data.user.id,
      session_id: tabId,
      updated_at: new Date().toISOString(),
    });
    if (upsertError) {
      await supabase.auth.signOut();
      setErro("Erro ao registrar sessão. Tente novamente.");
      setLoading(false); return;
    }
    onLogin(data.user, tabId, profile);
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!emailRecovery) { setErro("Informe seu email."); return; }
    setLoading(true); setErro("");
    const { error } = await supabase.auth.resetPasswordForEmail(emailRecovery);
    if (error) { setErro("Erro ao enviar email. Verifique o endereço."); setLoading(false); return; }
    setModo("otp");
    setLoading(false);
  };

  const handleOtp = async () => {
    if (!otpCode || otpCode.length < 6) { setErro("Informe o código de 6 dígitos."); return; }
    setLoading(true); setErro("");
    const { error } = await supabase.auth.verifyOtp({
      email: emailRecovery,
      token: otpCode,
      type: "recovery",
    });
    if (error) { setErro("Código inválido ou expirado. Solicite um novo."); setLoading(false); return; }
    setModo("newpassword");
    setLoading(false);
  };

  const handleNewPassword = async () => {
    if (!novaSenha || !confirmar) { setErro("Preencha os dois campos."); return; }
    if (novaSenha.length < 6) { setErro("A senha deve ter pelo menos 6 caracteres."); return; }
    if (novaSenha !== confirmar) { setErro("As senhas não coincidem."); return; }
    setLoading(true); setErro("");
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    if (error) { setErro("Erro ao atualizar senha. Tente novamente."); setLoading(false); return; }
    await supabase.auth.signOut();
    sessionStorage.removeItem("pendingRecovery");
    setModo("login");
    setErro("");
    setNovaSenha(""); setConfirmar(""); setOtpCode(""); setEmailRecovery("");
    setLoading(false);
    alert("✅ Senha atualizada! Faça login com a nova senha.");
  };

  const inputStyle = (hasError) => ({
    width: "100%", background: "rgba(0,0,0,0.4)",
    border: `1px solid ${hasError ? "rgba(248,113,113,0.6)" : "rgba(196,160,80,0.3)"}`,
    borderRadius: 8, color: "#f0e6c8", padding: "12px 16px", fontSize: 14,
    fontFamily: "'Space Mono', monospace", outline: "none",
    boxSizing: "border-box", marginBottom: 10,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#080810", backgroundImage: "radial-gradient(ellipse at 50% 40%, rgba(196,160,80,0.08) 0%, transparent 60%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 16, padding: "40px 48px", textAlign: "center", width: 380 }}>
        <div style={{ fontSize: 10, color: "#c4a050", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>⚔ RavenQuest · Merchant Ledger ⚔</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#f0e6c8", marginBottom: 4 }}>Tradepack Prime</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#c4a050", marginBottom: 28 }}>Calculator</div>

        {/* LOGIN */}
        {modo === "login" && <>
          <input type="email" placeholder="Seu email de acesso" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle(false)} />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "VERIFICANDO..." : "ENTRAR →"}
          </button>
          <button onClick={() => { setModo("forgot"); setErro(""); }} style={{ background: "none", border: "none", color: "rgba(196,160,80,0.5)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>
            Esqueci minha senha
          </button>
        </>}

        {/* ESQUECI MINHA SENHA */}
        {modo === "forgot" && <>
          <div style={{ color: "#a0a0b0", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Informe seu email. Você receberá um código de 6 dígitos para redefinir a senha.
          </div>
          <input type="email" placeholder="Seu email de acesso" value={emailRecovery} onChange={e => setEmailRecovery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleForgot()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleForgot} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "ENVIANDO..." : "ENVIAR CÓDIGO →"}
          </button>
          <button onClick={() => { setModo("login"); setErro(""); }} style={{ background: "none", border: "none", color: "rgba(196,160,80,0.5)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
            ← Voltar ao login
          </button>
        </>}

        {/* INSERIR CÓDIGO OTP */}
        {modo === "otp" && <>
          <div style={{ color: "#4ade80", fontSize: 11, marginBottom: 16 }}>✅ Email enviado para {emailRecovery}</div>
          <div style={{ color: "#a0a0b0", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Insira o código de 6 dígitos recebido no email.
          </div>
          <input type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="one-time-code" placeholder="Código de 6 dígitos" value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))} onKeyDown={e => e.key === "Enter" && handleOtp()}
            style={{ ...inputStyle(!!erro), fontSize: 24, letterSpacing: "0.3em", textAlign: "center" }} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleOtp} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "VERIFICANDO..." : "VERIFICAR CÓDIGO →"}
          </button>
          <button onClick={() => { setModo("forgot"); setErro(""); setOtpCode(""); }} style={{ background: "none", border: "none", color: "rgba(196,160,80,0.5)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
            ← Reenviar código
          </button>
        </>}

        {/* NOVA SENHA */}
        {modo === "newpassword" && <>
          <div style={{ color: "#a0a0b0", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Código verificado. Defina sua nova senha.
          </div>
          <input type="password" placeholder="Nova senha (mín. 6 caracteres)" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} style={inputStyle(false)} />
          <input type="password" placeholder="Confirmar senha" value={confirmar} onChange={e => setConfirmar(e.target.value)} onKeyDown={e => e.key === "Enter" && handleNewPassword()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleNewPassword} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em" }}>
            {loading ? "SALVANDO..." : "SALVAR NOVA SENHA →"}
          </button>
        </>}

        <div style={{ color: "#303040", fontSize: 10, marginTop: 24 }}>ToilZero Calculator · Acesso restrito</div>
      </div>
    </div>
  );
}

const fmt = (n, d = 2) => n == null ? "—" : n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Math.round(n).toLocaleString("pt-BR");
const fmtUSD = (n) => `$${fmt(Math.abs(n), 3)}`;
const green = "#4ade80", red = "#f87171", gold = "#c4a050", blue = "#60a5fa", dim = "#a0a0b0", purple = "#a78bfa", orange = "#fb923c";
const pc = (v) => v > 0 ? green : v < 0 ? red : "#f0e6c8";

const PACKS = {
  "Pickled Vegetables": { materiais: [
    { nome: "Cabbage", qtd: 238, custoProducao: 72, precoMkt: 2100 },
    { nome: "Carrot", qtd: 300, custoProducao: 83, precoMkt: 2000 },
    { nome: "Salt", qtd: 12, custoProducao: 0, precoMkt: 4900 },
  ]},
  "Cavedweller Findings": { materiais: [
    { nome: "Cobalt Ore", qtd: 110, custoProducao: 0, precoMkt: 16000 },
    { nome: "Stone", qtd: 148, custoProducao: 0, precoMkt: 885 },
    { nome: "Glowing Spores", qtd: 120, custoProducao: 82, precoMkt: 2440 },
    { nome: "Thorny Roots", qtd: 120, custoProducao: 85, precoMkt: 85 },
  ]},
};

function Field({ label, value, onChange, suffix, step = "any", hint, min = 0, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} min={min} step={step}
          style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${color ? color + "55" : "rgba(196,160,80,0.3)"}`, borderRadius: 6, color: color || "#f0e6c8", padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
        {suffix && <span style={{ color: gold, fontSize: 12, whiteSpace: "nowrap" }}>{suffix}</span>}
      </div>
      {hint && <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function Section({ title, icon, children, accent, borderColor }) {
  return (
    <div style={{ background: accent ? "rgba(196,160,80,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${borderColor || (accent ? "rgba(196,160,80,0.3)" : "rgba(255,255,255,0.07)")}`, borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ color: gold, fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, sub, color = "#f0e6c8", big, highlight, warn }) {
  return (
    <div style={{ background: highlight ? "rgba(196,160,80,0.08)" : warn ? "rgba(248,113,113,0.05)" : "rgba(0,0,0,0.25)", border: `1px solid ${highlight ? "rgba(196,160,80,0.35)" : warn ? "rgba(248,113,113,0.18)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
      <div style={{ color: "#707080", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{label}</div>
      <div style={{ color, fontSize: big ? 20 : 15, fontFamily: "'Space Mono', monospace", fontWeight: "bold", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: "#555565", fontSize: 10, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(196,160,80,0.12)" }} />
      <span style={{ color: gold, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(196,160,80,0.12)" }} />
    </div>
  );
}

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [sessionAtual, setSessionAtual] = useState("");
  const [expiresAt, setExpiresAt] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tab, setTab] = useState("tradepack");

  // Função de logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAutenticado(false);
    setUserEmail(""); setUserId(""); setSessionAtual(""); setExpiresAt(null);
  };

  // Persistência de sessão — ao recarregar o browser, restaura a sessão
  useEffect(() => {
    const restoreSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setInitialLoading(false); return; }

      const { data: profile } = await supabase
        .from("profiles").select("*").eq("id", session.user.id).single();

      if (!profile || !profile.active || new Date(profile.expires_at) < new Date()) {
        await supabase.auth.signOut();
        setInitialLoading(false); return;
      }

      // Valida sessão única — condição estrita: sem registro = bloqueia
      // tabId é único por aba, então se outra aba/dispositivo logou, o ID não bate
      const { data: activeSession, error: sessionError } = await supabase
        .from("active_sessions").select("session_id").eq("user_id", session.user.id).single();

      if (sessionError || !activeSession || activeSession.session_id !== tabId) {
        await supabase.auth.signOut();
        setInitialLoading(false); return;
      }

      // Registra o tabId desta aba como sessão ativa
      await supabase.from("active_sessions").upsert({
        user_id: session.user.id,
        session_id: tabId,
        updated_at: new Date().toISOString(),
      });

      setUserId(session.user.id);
      setUserEmail(profile.email);
      setSessionAtual(tabId);
      setExpiresAt(profile.expires_at);
      setAutenticado(true);
      setInitialLoading(false);
    };
    restoreSession();
  }, []);

  // Verificação de sessão única a cada 60 segundos
  useEffect(() => {
    if (!autenticado || !userId || !sessionAtual) return;
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from("active_sessions")
        .select("session_id")
        .eq("user_id", userId)
        .single();
      if (data?.session_id !== sessionAtual) {
        await supabase.auth.signOut();
        alert("⚠️ Sessão encerrada: acesso detectado em outro dispositivo.");
        setAutenticado(false);
        setUserEmail(""); setUserId(""); setSessionAtual(""); setExpiresAt(null);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [autenticado, userId, sessionAtual]);

  // MERCADO
  const [poolRate, setPoolRate] = useState(0.0000264);
  const [questUSD, setQuestUSD] = useState(0.0042);
  const [questToSilver, setQuestToSilver] = useState(50650);

  // CALIBRAÇÃO
  const [calQUEST, setCalQUEST] = useState(386);

  // EXPEDIÇÃO
  const [imExpSemana, setImExpSemana] = useState(4312920);
  const [joiasTotal, setJoiasTotal] = useState(664);

  // TRADEPACK
  const [packSelecionado, setPackSelecionado] = useState("Cavedweller Findings");
  const [qtdPacks, setQtdPacks] = useState(10);
  const [silverPorPack, setSilverPorPack] = useState(79126);
  const imPorPack = silverPorPack * 10;
  const [qtdEnhanced, setQtdEnhanced] = useState(0);
  const [qtdPlunder, setQtdPlunder] = useState(0);
  const [custoCert, setCustoCert] = useState(1.2);

  // HUNT — itens coletados por 1 HORA (base fixa)
  const [huntHorasDia, setHuntHorasDia] = useState(3);
  const [huntAddonQtd, setHuntAddonQtd] = useState(0);
  const [huntAddonPreco, setHuntAddonPreco] = useState(0);
  const [huntInfusionQtd, setHuntInfusionQtd] = useState(0);
  const [huntInfusionPreco, setHuntInfusionPreco] = useState(0);
  const [huntNPC, setHuntNPC] = useState(0);

  // MINERAÇÃO — itens coletados por 1 HORA (base fixa)
  const [mineHorasDia, setMineHorasDia] = useState(3);
  const [mineOres, setMineOres] = useState({
    "Copper Ore":   { qtd: 0, preco: 0 },
    "Tin Ore":      { qtd: 0, preco: 0 },
    "Iron Ore":     { qtd: 0, preco: 0 },
    "Stone":        { qtd: 0, preco: 0 },
    "Salt":         { qtd: 0, preco: 0 },
    "Cobalt Ore":   { qtd: 0, preco: 0 },
    "Titanium Ore": { qtd: 0, preco: 0 },
  });

  // GEMAS
  const [mineGems, setMineGems] = useState({
    "Ruby":      { qtd: 0, preco: 0 },
    "Ametista":  { qtd: 0, preco: 0 },
    "Esmeralda": { qtd: 0, preco: 0 },
    "Citrine":   { qtd: 0, preco: 0 },
    "Safira":    { qtd: 0, preco: 0 },
    "Topaz":     { qtd: 0, preco: 0 },
  });

  const setOre = (nome, campo, val) => setMineOres(prev => ({ ...prev, [nome]: { ...prev[nome], [campo]: val } }));
  const setGem = (nome, campo, val) => setMineGems(prev => ({ ...prev, [nome]: { ...prev[nome], [campo]: val } }));

  // Totais base (1 hora)
  const huntSilverHora = (huntAddonQtd * huntAddonPreco) + (huntInfusionQtd * huntInfusionPreco) + huntNPC;
  const mineSilverHora = Object.values(mineOres).reduce((a, v) => a + v.qtd * v.preco, 0)
    + Object.values(mineGems).reduce((a, v) => a + v.qtd * v.preco, 0);

  // Projeções baseadas nas horas/dia configuradas
  const huntSilverDia = huntSilverHora * huntHorasDia;
  const huntSilverMes = huntSilverDia * 30;
  const mineSilverDia = mineSilverHora * mineHorasDia;
  const mineSilverMes = mineSilverDia * 30;

  const toUSD = (silver) => (silver / questToSilver) * questUSD;

  // MATERIAIS
  const packAtual = PACKS[packSelecionado];
  const [matsOverride, setMatsOverride] = useState({});
  const [matsQUEST, setMatsQUEST] = useState({});
  const getMat = (nome, campo) => (matsOverride[nome]?.[campo] !== undefined ? matsOverride[nome][campo] : packAtual.materiais.find(m => m.nome === nome)?.[campo] ?? 0);
  const setMat = (nome, campo, val) => setMatsOverride(prev => ({ ...prev, [nome]: { ...(prev[nome] || {}), [campo]: val } }));
  const toggleQUEST = (nome) => setMatsQUEST(prev => ({ ...prev, [nome]: !prev[nome] }));
  const getCustoReal = (nome) => {
    const base = getMat(nome, "custoProducao");
    return matsQUEST[nome] ? base * 0.8 : base;
  };

  // ── SUPABASE SETTINGS SYNC ────────────────────────────────────────────────
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Carrega as configurações do usuário ao autenticar
  useEffect(() => {
    if (!autenticado || !userId || settingsLoaded) return;
    const loadSettings = async () => {
      setDataLoading(true);
      const { data } = await supabase
        .from("user_settings")
        .select("settings")
        .eq("user_id", userId)
        .single();
      if (data?.settings && Object.keys(data.settings).length > 0) {
        const s = data.settings;
        if (s.poolRate !== undefined) setPoolRate(s.poolRate);
        if (s.questUSD !== undefined) setQuestUSD(s.questUSD);
        if (s.questToSilver !== undefined) setQuestToSilver(s.questToSilver);
        if (s.calQUEST !== undefined) setCalQUEST(s.calQUEST);
        if (s.imExpSemana !== undefined) setImExpSemana(s.imExpSemana);
        if (s.joiasTotal !== undefined) setJoiasTotal(s.joiasTotal);
        if (s.packSelecionado !== undefined) setPackSelecionado(s.packSelecionado);
        if (s.qtdPacks !== undefined) setQtdPacks(s.qtdPacks);
        if (s.silverPorPack !== undefined) setSilverPorPack(s.silverPorPack);
        if (s.qtdEnhanced !== undefined) setQtdEnhanced(s.qtdEnhanced);
        if (s.qtdPlunder !== undefined) setQtdPlunder(s.qtdPlunder);
        if (s.custoCert !== undefined) setCustoCert(s.custoCert);
        if (s.matsOverride !== undefined) setMatsOverride(s.matsOverride);
        if (s.matsQUEST !== undefined) setMatsQUEST(s.matsQUEST);
        if (s.huntHorasDia !== undefined) setHuntHorasDia(s.huntHorasDia);
        if (s.huntAddonQtd !== undefined) setHuntAddonQtd(s.huntAddonQtd);
        if (s.huntAddonPreco !== undefined) setHuntAddonPreco(s.huntAddonPreco);
        if (s.huntInfusionQtd !== undefined) setHuntInfusionQtd(s.huntInfusionQtd);
        if (s.huntInfusionPreco !== undefined) setHuntInfusionPreco(s.huntInfusionPreco);
        if (s.huntNPC !== undefined) setHuntNPC(s.huntNPC);
        if (s.mineHorasDia !== undefined) setMineHorasDia(s.mineHorasDia);
        if (s.mineOres !== undefined) setMineOres(s.mineOres);
        if (s.mineGems !== undefined) setMineGems(s.mineGems);
      }
      setSettingsLoaded(true);
      setDataLoading(false);
    };
    loadSettings();
  }, [autenticado, userId, settingsLoaded]);

  // Salva automaticamente 3 segundos após qualquer mudança
  useEffect(() => {
    if (!autenticado || !userId || !settingsLoaded) return;
    setSaving(true);
    const timeout = setTimeout(async () => {
      try {
        await supabase.from("user_settings").upsert({
          user_id: userId,
          settings: {
            poolRate, questUSD, questToSilver, calQUEST,
            imExpSemana, joiasTotal, packSelecionado,
            qtdPacks, silverPorPack, qtdEnhanced, qtdPlunder, custoCert,
            matsOverride, matsQUEST,
            huntHorasDia, huntAddonQtd, huntAddonPreco,
            huntInfusionQtd, huntInfusionPreco, huntNPC,
            mineHorasDia, mineOres, mineGems,
          },
          updated_at: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Erro ao salvar configurações:", e);
      } finally {
        setSaving(false);
      }
    }, 3000);
    return () => { clearTimeout(timeout); setSaving(false); };
  }, [poolRate, questUSD, questToSilver, calQUEST, imExpSemana, joiasTotal,
    packSelecionado, qtdPacks, silverPorPack, qtdEnhanced, qtdPlunder, custoCert,
    matsOverride, matsQUEST,
    huntHorasDia, huntAddonQtd, huntAddonPreco, huntInfusionQtd, huntInfusionPreco, huntNPC,
    mineHorasDia, mineOres, mineGems]);

  const r = useMemo(() => {
    const MES = 30 / 7;
    const packsSemanais = qtdPacks;
    const enhancedVal = Math.min(qtdEnhanced, packsSemanais);
    const plunderVal = Math.min(qtdPlunder, packsSemanais);
    const packsNormais = packsSemanais - enhancedVal;

    // IM por categoria
    // IMPORTANTE: imPorPack já inclui o Bartering (calculado pelo jogo no silver_value)
    // Fórmula real: IM = silver_value × 10 (prime) × bartering (já embutido no jogo)
    // Enhanced = ×2 adicional | Plunder = +15% adicional sobre o imPorPack observado
    const imBase = imPorPack;
    const imNormalTotal = packsNormais * imBase;
    const imEnhancedTotal = enhancedVal * imBase * 2;
    const imPlunderTotal = plunderVal * imBase * 0.15;
    const imTotal_semana = imNormalTotal + imEnhancedTotal + imPlunderTotal;
    const imEfetiva = packsSemanais > 0 ? imTotal_semana / packsSemanais : imBase;

    // Custos
    const mats = packAtual.materiais;
    const custoProducaoTotal = mats.reduce((acc, m) => acc + m.qtd * getCustoReal(m.nome), 0);
    const valorMktTotal = mats.reduce((acc, m) => acc + m.qtd * getMat(m.nome, "precoMkt"), 0);
    const certCusto_Q = 10 * custoCert;
    const certCusto_S = certCusto_Q * questToSilver;
    const silverLiqPorPack = silverPorPack - custoProducaoTotal;

    // QUEST dos packs — semanal e mensal
    const questIM_sem = imTotal_semana * poolRate;
    const questCerts_sem = packsSemanais * certCusto_Q;
    const questLiq_sem = questIM_sem - questCerts_sem;
    const questIM_mes = questIM_sem * MES;
    const questCerts_mes = questCerts_sem * MES;
    const questLiq_mes = questLiq_sem * MES;

    // Custo oportunidade
    const lucroVendaMkt = valorMktTotal - custoProducaoTotal;
    const questVendaMkt = lucroVendaMkt / questToSilver;
    const questPack = (silverLiqPorPack / questToSilver) - certCusto_Q + (imEfetiva * poolRate);
    const deltaQUEST = questPack - questVendaMkt;

    // Break-even
    const questNecessarioPorPack = (lucroVendaMkt / questToSilver) + certCusto_Q - (silverLiqPorPack / questToSilver);
    const imBreakeven = poolRate > 0 ? questNecessarioPorPack / poolRate : 0;
    const imBreaakevenEnhanced = poolRate > 0 ? questNecessarioPorPack / (poolRate * 2) : 0;

    // Expedição — semanal e mensal
    const expIM = imExpSemana;
    const expQUEST_sem = expIM * poolRate;
    const expUSD_sem = expQUEST_sem * questUSD;
    const expQUEST_mes = expQUEST_sem * MES;
    const expUSD_mes = expQUEST_mes * questUSD;

    // Silver dos packs — semanal e mensal
    const silverPacks_sem = packsSemanais * silverLiqPorPack;
    const silverPacks_mes = silverPacks_sem * MES;
    const questSilverPacks_sem = silverPacks_sem / questToSilver;
    const questSilverPacks_mes = silverPacks_mes / questToSilver;

    // Totais — semanal e mensal
    const totalIM = expIM + imTotal_semana;
    const totalQUEST_sem = expQUEST_sem + questLiq_sem + questSilverPacks_sem;
    const totalQUEST_mes = totalQUEST_sem * MES;
    const totalUSD_sem = totalQUEST_sem * questUSD;
    const totalUSD_mes = totalQUEST_mes * questUSD;

    // Comparativo atividades — removido, agora na aba Hunt com detalhamento por item

    // Estratégias — semanal e mensal
    const lucroVenderMkt_sem = packsSemanais * lucroVendaMkt;
    const lucroVenderMkt_mes = lucroVenderMkt_sem * MES;

    const profitReal_sem = totalUSD_sem;
    const profitReal_mes = totalUSD_mes;

    const profitAlt_sem = expUSD_sem + (lucroVenderMkt_sem / questToSilver) * questUSD;
    const profitAlt_mes = profitAlt_sem * MES;

    const diferenca_sem = profitReal_sem - profitAlt_sem;
    const diferenca_mes = profitReal_mes - profitAlt_mes;

    return {
      MES, packsSemanais, enhancedVal, plunderVal, packsNormais,
      imBase, imNormalTotal, imEnhancedTotal, imPlunderTotal, imTotal_semana, imEfetiva,
      custoProducaoTotal, valorMktTotal, certCusto_Q, certCusto_S,
      silverLiqPorPack, silverPacks_sem, silverPacks_mes,
      questIM_sem, questIM_mes, questCerts_sem, questCerts_mes, questLiq_sem, questLiq_mes,
      lucroVendaMkt, questVendaMkt, questPack, deltaQUEST,
      imBreakeven, imBreaakevenEnhanced, questNecessarioPorPack,
      expIM, expQUEST_sem, expQUEST_mes, expUSD_sem, expUSD_mes,
      totalIM, totalQUEST_sem, totalQUEST_mes, totalUSD_sem, totalUSD_mes,
      lucroVenderMkt_sem, lucroVenderMkt_mes,
      profitReal_sem, profitReal_mes, profitAlt_sem, profitAlt_mes,
      diferenca_sem, diferenca_mes,
    };
  }, [poolRate, questUSD, questToSilver, imExpSemana, packSelecionado,
    qtdPacks, silverPorPack, qtdEnhanced, qtdPlunder, custoCert,
    matsOverride, matsQUEST]);

  if (initialLoading) return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#c4a050", marginBottom: 16 }}>Tradepack Prime</div>
        <div style={{ color: "#505060", fontSize: 11, letterSpacing: "0.15em" }}>CARREGANDO...</div>
      </div>
    </div>
  );

  if (!autenticado) return <LoginScreen onLogin={(user, sessionId, profile) => {
    setUserId(user.id);
    setUserEmail(profile.email);
    setSessionAtual(sessionId);
    setExpiresAt(profile.expires_at);
    setAutenticado(true);
  }} />;

  const tabs = [
    { id: "tradepack", label: "📦 Tradepack" },
    { id: "comparativo", label: "🏹 Hunt" },
    { id: "mercado", label: "💰 Materiais" },
    { id: "calibracao", label: "📐 Calibração" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080810", backgroundImage: "radial-gradient(ellipse at 15% 15%, rgba(196,160,80,0.07) 0%, transparent 55%)", fontFamily: "'Space Mono', monospace", color: "#f0e6c8", padding: "20px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* WATERMARK — email do usuário para rastreabilidade */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden", opacity: 0.055 }}>
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: `${(i % 8) * 13}%`, left: `${Math.floor(i / 8) * 17}%`, transform: "rotate(-30deg)", color: "#ffffff", fontSize: 12, fontFamily: "monospace", whiteSpace: "nowrap", userSelect: "none" }}>
            {userEmail}
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        {/* Linha decorativa superior */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(196,160,80,0.5))" }} />
          <div style={{ fontSize: 10, color: "rgba(196,160,80,0.7)", letterSpacing: "0.35em", textTransform: "uppercase" }}>RavenQuest · Merchant Ledger</div>
          <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(196,160,80,0.5))" }} />
        </div>

        {/* Título principal */}
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 700, color: "#f0e6c8", margin: "0 0 2px", letterSpacing: "0.05em" }}>Tradepack Prime</h1>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg, #c4a050, #f0d080, #c4a050)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16 }}>Calculator</div>

        {/* Linha decorativa inferior */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(to right, transparent, rgba(196,160,80,0.3))" }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(196,160,80,0.5)" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: gold }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(196,160,80,0.5)" }} />
          </div>
          <div style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(to left, transparent, rgba(196,160,80,0.3))" }} />
        </div>

        {/* Indicador de salvamento */}
        <div style={{ marginTop: 10, fontSize: 10, color: saving ? "rgba(196,160,80,0.6)" : "rgba(74,222,128,0.5)", letterSpacing: "0.1em", transition: "color 0.5s" }}>
          {dataLoading ? "⟳ carregando seus dados..." : saving ? "⟳ salvando..." : settingsLoaded ? "✓ dados sincronizados" : ""}
        </div>

        {/* Barra de usuário — logout + expiração */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 10 }}>
          {/* Expiração */}
          {expiresAt && (() => {
            const dias = Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
            const expColor = dias <= 7 ? "#f87171" : dias <= 14 ? "#fb923c" : "#505060";
            return (
              <div style={{ fontSize: 10, color: expColor, letterSpacing: "0.08em" }}>
                {dias <= 7 && "⚠️ "}{dias > 0 ? `Acesso válido por ${dias} dia${dias !== 1 ? "s" : ""}` : "Acesso expirado"}
              </div>
            );
          })()}

          {/* Logout */}
          <button onClick={handleLogout} style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, color: "rgba(248,113,113,0.6)", padding: "4px 12px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.08em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(248,113,113,0.15)"; e.target.style.color = "#f87171"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(248,113,113,0.08)"; e.target.style.color = "rgba(248,113,113,0.6)"; }}>
            SAIR
          </button>
        </div>
      </div>

      {/* RESULTADO PRINCIPAL — 3 CENÁRIOS */}
      <div style={{ background: "linear-gradient(135deg, rgba(196,160,80,0.10), rgba(196,160,80,0.02))", border: "1px solid rgba(196,160,80,0.4)", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: 14 }}>💰 Comparativo de Estratégias</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {/* Fazendo os packs */}
          <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📦 Fazendo os Packs Prime</div>
            <div style={{ color: green, fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>+{fmtUSD(r.profitReal_mes)}<span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span></div>
            <div style={{ color: green, fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>+{fmtUSD(r.profitReal_sem)}<span style={{ fontSize: 11 }}>/sem</span></div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>Expedição + silver + QUEST ✅</div>
          </div>
          {/* Vendendo materiais */}
          <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💰 Vendendo os Materiais</div>
            <div style={{ color: orange, fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>+{fmtUSD(r.profitAlt_mes)}<span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span></div>
            <div style={{ color: orange, fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>+{fmtUSD(r.profitAlt_sem)}<span style={{ fontSize: 11 }}>/sem</span></div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>Expedição + venda no mkt ✅</div>
          </div>
          {/* Diferença */}
          <div style={{ background: r.diferenca_mes >= 0 ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${r.diferenca_mes >= 0 ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📊 Diferença de Estratégia</div>
            <div style={{ color: pc(r.diferenca_mes), fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{r.diferenca_mes >= 0 ? "+" : ""}{fmtUSD(r.diferenca_mes)}<span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span></div>
            <div style={{ color: pc(r.diferenca_sem), fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>{r.diferenca_sem >= 0 ? "+" : ""}{fmtUSD(r.diferenca_sem)}<span style={{ fontSize: 11 }}>/sem</span></div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              {r.diferenca_mes >= 0 ? "Pack compensa ✅" : "Vender mat. é melhor ❌"}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <Stat label="Expedição" value={`+${fmtUSD(r.expUSD_mes)}/mês`} sub={`+${fmtUSD(r.expUSD_sem)}/sem · ${fmtInt(joiasTotal)} 💎`} color={blue} />
          <Stat label="IM Packs/sem" value={fmtInt(r.imTotal_semana)} sub={`${r.packsSemanais} packs`} color={gold} />
          <Stat label="QUEST IM líq." value={`${fmt(r.questLiq_sem)}/sem`} sub={`${fmt(r.questLiq_mes)}/mês · -${fmt(r.questCerts_sem)} Q certs`} color={pc(r.questLiq_sem)} />
          <Stat label="Delta vs Vender Mat." value={`${r.deltaQUEST >= 0 ? "+" : ""}${fmt(r.deltaQUEST)} Q`} sub="por pack" color={pc(r.deltaQUEST)} highlight={r.deltaQUEST >= 0} warn={r.deltaQUEST < 0} />
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? `linear-gradient(135deg, ${gold}, #8a6a20)` : "rgba(0,0,0,0.4)", border: `1px solid ${tab === t.id ? gold : "rgba(196,160,80,0.3)"}`, borderRadius: 8, color: tab === t.id ? "#000" : dim, padding: "8px 16px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: tab === t.id ? "bold" : "normal" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: TRADEPACK */}
      {tab === "tradepack" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <Section title="Configuração do Pack" icon="📦">
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Pack Selecionado</label>
                <select value={packSelecionado} onChange={e => { setPackSelecionado(e.target.value); setMatsOverride({}); setMatsQUEST({}); }}
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: gold, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }}>
                  {Object.keys(PACKS).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Packs por semana" value={qtdPacks} onChange={setQtdPacks} step={1} />
                <Field label="Silver/pack entregue" value={silverPorPack} onChange={setSilverPorPack} step={1000} suffix="silver" hint="Varia por demanda/rota" />
                <Field label="Custo certificado" value={custoCert} onChange={setCustoCert} step="0.05" suffix="QUEST" />
                <div>
                  <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>IM base/pack (automático)</label>
                  <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 6, padding: "8px 12px" }}>
                    <div style={{ color: green, fontSize: 14, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(imPorPack)}</div>
                    <div style={{ color: "#505060", fontSize: 10, marginTop: 2 }}>{fmtInt(silverPorPack)} silver × 10 (prime)</div>
                  </div>
                </div>
              </div>

              <Divider label="Packs Especiais" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="🔮 Packs com Enhanced" value={qtdEnhanced} onChange={v => setQtdEnhanced(Math.min(v, qtdPacks))} step={1} suffix="packs" hint={`×2 IM · máx ${qtdPacks}`} color={qtdEnhanced > 0 ? gold : undefined} />
                <Field label="⚔️ Packs no Plunder" value={qtdPlunder} onChange={v => setQtdPlunder(Math.min(v, qtdPacks))} step={1} suffix="packs" hint="+15% IM · dom→seg" color={qtdPlunder > 0 ? red : undefined} />
              </div>

              {/* Breakdown */}
              <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 14px", marginTop: 4 }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Breakdown dos {qtdPacks} packs</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#c0c0d0" }}>📦 Normais</span>
                    <span style={{ color: "#c0c0d0", fontFamily: "'Space Mono', monospace" }}>{r.packsNormais} × {fmtInt(r.imBase)} = {fmtInt(r.imNormalTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: qtdEnhanced > 0 ? gold : "#404050" }}>🔮 Enhanced (×2)</span>
                    <span style={{ color: qtdEnhanced > 0 ? gold : "#404050", fontFamily: "'Space Mono', monospace" }}>{r.enhancedVal} × {fmtInt(r.imBase * 2)} = {fmtInt(r.imEnhancedTotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: qtdPlunder > 0 ? red : "#404050" }}>⚔️ Plunder (+15%)</span>
                    <span style={{ color: qtdPlunder > 0 ? red : "#404050", fontFamily: "'Space Mono', monospace" }}>{r.plunderVal} packs → +{fmtInt(r.imPlunderTotal)} bônus</span>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: gold, fontWeight: "bold" }}>Total IM packs/sem</span>
                    <span style={{ color: gold, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(r.imTotal_semana)}</span>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Bônus Ativos" icon="⚡" borderColor="rgba(196,160,80,0.4)">
              <div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                {[
                  { label: "✅ Bartering I (+5%)", sub: "embutido no IM/pack observado", color: green },
                  { label: "✅ Bartering II (+10%)", sub: "embutido no IM/pack observado", color: green },
                  { label: `${qtdEnhanced > 0 ? "🔮" : "⬜"} Enhanced (×2 IM)`, sub: qtdEnhanced > 0 ? `${qtdEnhanced} packs · aplicado sobre o IM observado` : "inativo", color: qtdEnhanced > 0 ? gold : dim },
                  { label: `${qtdPlunder > 0 ? "⚔️" : "⬜"} Plunder (+15%)`, sub: qtdPlunder > 0 ? `${qtdPlunder} packs · dom→seg` : "inativo", color: qtdPlunder > 0 ? red : dim },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 6 : 0 }}>
                    <span style={{ color: b.color, fontSize: 12 }}>{b.label}</span>
                    <span style={{ color: "#505060", fontSize: 11 }}>{b.sub}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 14px", fontSize: 11, color: dim, lineHeight: 1.6 }}>
                ℹ️ <strong style={{ color: gold }}>IM base/pack</strong> é calculada automaticamente como <strong style={{ color: gold }}>silver × 10</strong> (multiplicador Prime do patch 1.0.7.1). O Bartering já está embutido no silver recebido. Enhanced (×2) e Plunder (+15%) são aplicados sobre esse valor.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <Stat label="Silver/pack" value={fmtInt(silverPorPack)} sub="valor entregue" color={blue} />
                <Stat label="IM Média/Pack efetiva" value={fmtInt(r.imEfetiva)} sub="com Enhanced + Plunder" color={gold} />
              </div>
            </Section>
          </div>

          <div>
            <Section title="Análise de Break-even" icon="⚖️" borderColor={r.deltaQUEST >= 0 ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}>
              <div style={{ background: r.deltaQUEST >= 0 ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${r.deltaQUEST >= 0 ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: 10, padding: 16, marginBottom: 14, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Resultado vs Vender Materiais</div>
                <div style={{ color: pc(r.deltaQUEST), fontSize: 24, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{r.deltaQUEST >= 0 ? "✅ COMPENSA" : "❌ NÃO COMPENSA"}</div>
                <div style={{ color: pc(r.deltaQUEST), fontSize: 14, marginTop: 4 }}>{r.deltaQUEST >= 0 ? "+" : ""}{fmt(r.deltaQUEST)} QUEST/pack vs vender</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <Stat
                  label="IM base necessária (sem Enhanced)"
                  value={fmtInt(r.imBreakeven)}
                  sub={`IM base atual: ${fmtInt(r.imBase)} · ${r.imBase >= r.imBreakeven ? "✅ passa" : "❌ não passa"}`}
                  color={r.imBase >= r.imBreakeven ? green : red}
                />
                <Stat
                  label="IM base necessária (com Enhanced)"
                  value={fmtInt(r.imBreaakevenEnhanced)}
                  sub={`IM base atual: ${fmtInt(r.imBase)} · ${r.imBase >= r.imBreaakevenEnhanced ? "✅ passa" : "❌ não passa"}`}
                  color={r.imBase >= r.imBreaakevenEnhanced ? green : orange}
                />
                <Stat
                  label="IM base/pack atual"
                  value={fmtInt(r.imBase)}
                  sub={`silver × 10 = ${fmtInt(silverPorPack)} × 10`}
                  color={dim}
                />
                <Stat
                  label="Margem (base vs necessária)"
                  value={`${r.imBase >= r.imBreakeven ? "+" : ""}${fmtInt(r.imBase - r.imBreakeven)}`}
                  sub={`sem Enhanced · ${r.imBase >= r.imBreakeven ? "compensa" : "não compensa"}`}
                  color={pc(r.imBase - r.imBreakeven)}
                />
              </div>
              <Divider label="Por pack · comparativo" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Stat label="Fazer pack (silver liq.)" value={fmtInt(r.silverLiqPorPack)} sub="pós custo produção" color={blue} />
                <Stat label="Vender materiais" value={fmtInt(r.lucroVendaMkt)} sub="pós custo produção" color={orange} />
                <Stat label="QUEST do pack/IM" value={fmt(r.imEfetiva * poolRate)} sub="por pack" color={purple} />
                <Stat label="Custo cert" value={`-${fmt(r.certCusto_Q)} Q`} sub={`-${fmtInt(r.certCusto_S)} silver`} color={red} warn />
                <Stat label="QUEST IM líq./sem" value={`${fmt(r.questLiq_sem)} Q`} sub={`${fmtUSD(r.questLiq_sem * questUSD)}/sem`} color={pc(r.questLiq_sem)} />
                <Stat label="QUEST IM líq./mês" value={`${fmt(r.questLiq_mes)} Q`} sub={`${fmtUSD(r.questLiq_mes * questUSD)}/mês`} color={pc(r.questLiq_mes)} highlight />
              </div>
            </Section>

            <Section title="Expedição" icon="⚔️">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="💎 Joias Acumuladas" value={joiasTotal} onChange={setJoiasTotal} step={10} suffix="joias" hint="Total acumulado (não reseta)" />
                <Field label="IM Expedição/Semana" value={imExpSemana} onChange={setImExpSemana} step={100000} suffix="IM" hint="Seu dado real: 4.312.920" color={green} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <Stat label="IM Expedição/sem" value={fmtInt(r.expIM)} />
                <Stat label="QUEST/sem" value={`${fmt(r.expQUEST_sem)} Q`} sub={`${fmtUSD(r.expUSD_sem)}/sem`} color={blue} />
                <Stat label="USD/mês" value={`+${fmtUSD(r.expUSD_mes)}`} sub={`${fmt(r.expQUEST_mes)} Q/mês`} color={blue} highlight />
              </div>
            </Section>

            <Section title="Mercado & Pool" icon="📊">
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Pool Rate (calculado via calibração)</label>
                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 6, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: green, fontSize: 14, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{poolRate.toFixed(8)}</span>
                  <span style={{ color: "#404050", fontSize: 10 }}>QUEST ÷ IM Total · atualize via aba Calibração</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="QUEST (USD)" value={questUSD} onChange={setQuestUSD} step="0.0001" suffix="USD" />
                <Field label="QUEST → Silver" value={questToSilver} onChange={setQuestToSilver} step="100" suffix="silver" />
              </div>
            </Section>
          </div>
        </div>
      )}

      {/* TAB: HUNT */}
      {tab === "comparativo" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* HUNT / CAÇA */}
            <div>
              <Section title="🏹 Caça (Hunt)" icon="⚔️" borderColor="rgba(248,113,113,0.3)">

                {/* Instrução */}
                <div style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
                  📌 Insira a quantidade de itens coletados em <strong style={{ color: red }}>1 hora</strong> de caça.
                </div>

                {/* Itens */}
                <div style={{ marginBottom: 6, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>Item</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>Qtd / hora</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>Preço Mkt</span>
                </div>

                {[
                  { label: "Addon", qtd: huntAddonQtd, preco: huntAddonPreco, setQtd: setHuntAddonQtd, setPreco: setHuntAddonPreco },
                  { label: "Infusion", qtd: huntInfusionQtd, preco: huntInfusionPreco, setQtd: setHuntInfusionQtd, setPreco: setHuntInfusionPreco },
                ].map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 8, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ color: "#c0c0d0", fontSize: 12 }}>{item.label}</span>
                    <input type="number" value={item.qtd} onChange={e => item.setQtd(parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <input type="number" value={item.preco} onChange={e => item.setPreco(parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 6, color: orange, padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                  </div>
                ))}

                {/* NPC */}
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 8, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ color: "#c0c0d0", fontSize: 12 }}>NPC</span>
                  <input type="number" value={huntNPC} onChange={e => setHuntNPC(parseFloat(e.target.value) || 0)} min={0}
                    placeholder="Silver direto/hora"
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                </div>

                <Divider label="Projeção" />

                {/* Horas por dia */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Horas/dia:</span>
                  <input type="number" value={huntHorasDia} onChange={e => setHuntHorasDia(Math.max(1, Math.min(24, parseFloat(e.target.value) || 1)))} min={1} max={24} step={0.5}
                    style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${red}55`, borderRadius: 6, color: red, padding: "6px 12px", fontSize: 14, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", fontWeight: "bold" }} />
                  <span style={{ color: "#404050", fontSize: 10 }}>horas de hunt por dia</span>
                </div>

                {/* Cards de projeção hunt */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: "1 hora", silver: huntSilverHora, highlight: false },
                    { label: `${huntHorasDia}h / dia`, silver: huntSilverDia, highlight: true },
                    { label: "mensal", silver: huntSilverMes, highlight: false },
                  ].map((p, i) => (
                    <div key={i} style={{ background: p.highlight ? "rgba(248,113,113,0.08)" : "rgba(0,0,0,0.25)", border: `1px solid ${p.highlight ? "rgba(248,113,113,0.35)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                      <div style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{p.label}</div>
                      <div style={{ color: red, fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(p.silver)}</div>
                      <div style={{ color: "#555565", fontSize: 9, marginTop: 4 }}>silver</div>
                      <div style={{ color: red, fontSize: 11, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>{fmtUSD(toUSD(p.silver))}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* MINERAÇÃO */}
            <div>
              <Section title="⛏️ Mineração" icon="🪨" borderColor="rgba(96,165,250,0.3)">

                <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
                  📌 Insira a quantidade de itens coletados em <strong style={{ color: blue }}>1 hora</strong> de mineração.
                </div>

                {/* Headers */}
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 60px", gap: 4, marginBottom: 6 }}>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Item</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Qtd / hora</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Preço Mkt</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Total/h</span>
                </div>

                {/* Ores */}
                {Object.entries(mineOres).map(([nome, v], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 60px", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ color: "#c0c0d0", fontSize: 11 }}>{nome}</span>
                    <input type="number" value={v.qtd} onChange={e => setOre(nome, "qtd", parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <input type="number" value={v.preco} onChange={e => setOre(nome, "preco", parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 6, color: orange, padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <span style={{ color: v.qtd * v.preco > 0 ? green : "#404050", fontSize: 10, fontFamily: "'Space Mono', monospace", textAlign: "right" }}>{fmtInt(v.qtd * v.preco)}</span>
                  </div>
                ))}

                <Divider label="💎 Gemas" />

                {Object.entries(mineGems).map(([nome, v], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 60px", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ color: "#c0c0d0", fontSize: 11 }}>{nome}</span>
                    <input type="number" value={v.qtd} onChange={e => setGem(nome, "qtd", parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <input type="number" value={v.preco} onChange={e => setGem(nome, "preco", parseFloat(e.target.value) || 0)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 6, color: purple, padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <span style={{ color: v.qtd * v.preco > 0 ? green : "#404050", fontSize: 10, fontFamily: "'Space Mono', monospace", textAlign: "right" }}>{fmtInt(v.qtd * v.preco)}</span>
                  </div>
                ))}

                <Divider label="Projeção" />

                {/* Horas por dia mine */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Horas/dia:</span>
                  <input type="number" value={mineHorasDia} onChange={e => setMineHorasDia(Math.max(1, Math.min(24, parseFloat(e.target.value) || 1)))} min={1} max={24} step={0.5}
                    style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${blue}55`, borderRadius: 6, color: blue, padding: "6px 12px", fontSize: 14, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", fontWeight: "bold" }} />
                  <span style={{ color: "#404050", fontSize: 10 }}>horas de mineração por dia</span>
                </div>

                {/* Cards projeção mine */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: "1 hora", silver: mineSilverHora, highlight: false },
                    { label: `${mineHorasDia}h / dia`, silver: mineSilverDia, highlight: true },
                    { label: "mensal", silver: mineSilverMes, highlight: false },
                  ].map((p, i) => (
                    <div key={i} style={{ background: p.highlight ? "rgba(96,165,250,0.08)" : "rgba(0,0,0,0.25)", border: `1px solid ${p.highlight ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                      <div style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{p.label}</div>
                      <div style={{ color: blue, fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(p.silver)}</div>
                      <div style={{ color: "#555565", fontSize: 9, marginTop: 4 }}>silver</div>
                      <div style={{ color: blue, fontSize: 11, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>{fmtUSD(toUSD(p.silver))}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          {/* Comparativo Hunt vs Tradepack */}
          <Section title="📊 Hunt vs Tradepack — Comparativo Mensal" icon="⚖️" accent>
            <div style={{ color: dim, fontSize: 10, marginBottom: 14, lineHeight: 1.6 }}>
              Baseado em {huntHorasDia}h/dia de hunt · {mineHorasDia}h/dia de mineração · {qtdPacks} packs/semana de tradepack
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "🏹 Hunt", mes: huntSilverMes, dia: huntSilverDia, hora: huntSilverHora, color: red },
                { label: "⛏️ Mineração", mes: mineSilverMes, dia: mineSilverDia, hora: mineSilverHora, color: blue },
                { label: "📦 Tradepack Prime", mes: r.totalUSD_mes / questUSD * questToSilver, dia: r.totalUSD_mes / 30 / questUSD * questToSilver, hora: r.totalUSD_mes / 30 / 24 / questUSD * questToSilver, color: gold },
              ].map((a, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                  <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{a.label}</div>
                  <div style={{ color: a.color, fontSize: 18, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtUSD(toUSD(a.mes))}<span style={{ fontSize: 10 }}>/mês</span></div>
                  <div style={{ color: a.color, fontSize: 12, marginTop: 4 }}>{fmtUSD(toUSD(a.dia))}<span style={{ fontSize: 9 }}>/dia</span></div>
                  <div style={{ color: "#404050", fontSize: 10, marginTop: 4 }}>{fmtUSD(toUSD(a.hora))}<span style={{ fontSize: 9 }}>/hora</span></div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* TAB: MATERIAIS */}
      {tab === "mercado" && (
        <div>
          <Section title={`Receita & Mercado — ${packSelecionado}`} icon="💰" accent>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Pack</label>
              <select value={packSelecionado} onChange={e => { setPackSelecionado(e.target.value); setMatsOverride({}); setMatsQUEST({}); }}
                style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: gold, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }}>
                {Object.keys(PACKS).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 11, color: dim }}>
              🌱 <strong style={{ color: purple }}>Plantar com QUEST</strong> — aplica <strong style={{ color: green }}>-20%</strong> no custo de produção do material selecionado. Ative por linha.
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 16 }}>
              <thead>
                <tr>{["Material", "Qtd", "Custo Prod./un", "🌱 QUEST (-20%)", "Custo Real/un", "Preço Mkt/un", "Custo Total", "Valor Mkt"].map(h => (
                  <th key={h} style={{ color: gold, padding: "8px 10px", textAlign: "right", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(196,160,80,0.2)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {packAtual.materiais.map((m, i) => {
                  const cp = getMat(m.nome, "custoProducao");
                  const pm = getMat(m.nome, "precoMkt");
                  const comQUEST = !!matsQUEST[m.nome];
                  const custoReal = comQUEST ? cp * 0.8 : cp;
                  return (
                    <tr key={i} style={{ background: comQUEST ? "rgba(167,139,250,0.05)" : "transparent" }}>
                      <td style={{ padding: "8px 10px", color: comQUEST ? purple : "#c0c0d0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.nome}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.qtd}</td>
                      <td style={{ padding: "4px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <input type="number" value={cp} onChange={e => setMat(m.nome, "custoProducao", parseFloat(e.target.value) || 0)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 4, color: "#f0e6c8", padding: "4px 8px", fontSize: 12, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <button onClick={() => toggleQUEST(m.nome)} style={{
                          background: comQUEST ? "rgba(167,139,250,0.25)" : "rgba(0,0,0,0.3)",
                          border: `1px solid ${comQUEST ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)"}`,
                          borderRadius: 6, color: comQUEST ? purple : "#404050",
                          padding: "4px 10px", cursor: "pointer", fontSize: 11,
                          fontFamily: "'Space Mono', monospace", transition: "all 0.15s",
                        }}>
                          {comQUEST ? "✅ ativo" : "⬜ não"}
                        </button>
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: comQUEST ? green : "#a0a0b0", fontWeight: comQUEST ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {fmtInt(custoReal)}{comQUEST && <span style={{ fontSize: 9, marginLeft: 4, color: green }}>-20%</span>}
                      </td>
                      <td style={{ padding: "4px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <input type="number" value={pm} onChange={e => setMat(m.nome, "precoMkt", parseFloat(e.target.value) || 0)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 4, color: orange, padding: "4px 8px", fontSize: 12, width: 90, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: comQUEST ? green : red, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{fmtInt(m.qtd * custoReal)}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: orange, borderBottom: "1px solid rgba(255,255,255,0.04)", fontWeight: "bold" }}>{fmtInt(m.qtd * pm)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
              <Stat label="Custo Produção/pack" value={fmtInt(r.custoProducaoTotal)} sub="silver" color={red} warn />
              <Stat label="Valor Mercado/pack" value={fmtInt(r.valorMktTotal)} sub="silver" color={orange} />
              <Stat label="Margem Venda Mkt" value={fmtInt(r.lucroVendaMkt)} sub="por pack" color={pc(r.lucroVendaMkt)} highlight={r.lucroVendaMkt > 0} />
            </div>
            <Divider label="Por pack — Fazer vs Vender" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📦 Fazer Pack Prime</div>
                <div style={{ color: blue, fontSize: 16, fontWeight: "bold" }}>{fmtInt(r.silverLiqPorPack)} silver</div>
                <div style={{ color: purple, fontSize: 12, marginTop: 4 }}>+ {fmt(r.imEfetiva * poolRate)} QUEST de IM</div>
                <div style={{ color: red, fontSize: 11, marginTop: 4 }}>- {fmt(r.certCusto_Q)} QUEST (certs)</div>
                <div style={{ color: pc(r.questPack), fontSize: 12, marginTop: 6, fontWeight: "bold" }}>= {fmt(r.questPack)} QUEST total</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, border: "1px solid rgba(251,146,60,0.2)" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💰 Vender Materiais</div>
                <div style={{ color: orange, fontSize: 16, fontWeight: "bold" }}>{fmtInt(r.lucroVendaMkt)} silver</div>
                <div style={{ color: "#555565", fontSize: 12, marginTop: 4 }}>sem custo de certs</div>
                <div style={{ color: orange, fontSize: 12, marginTop: 4 }}>= {fmt(r.questVendaMkt)} QUEST equiv.</div>
                <div style={{ color: pc(r.deltaQUEST * -1), fontSize: 12, marginTop: 6, fontWeight: "bold" }}>{r.deltaQUEST <= 0 ? "+" : ""}{fmt(r.deltaQUEST * -1)} QUEST a mais</div>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* TAB: CALIBRAÇÃO */}
      {tab === "calibracao" && (
        <div>
          <Section title="Calibração com Dados Reais" icon="📐" borderColor="rgba(74,222,128,0.4)">
            <div style={{ background: "rgba(74,222,80,0.04)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
              Insira o QUEST recebido no chest de sexta. A IM total é calculada automaticamente (Expedição + Packs com Enhanced e Plunder).
            </div>

            <div style={{ marginBottom: 14 }}>
              <Field label="QUEST recebido" value={calQUEST} onChange={setCalQUEST} step={1} suffix="QUEST" hint="Chest de sexta-feira" />
            </div>

            {/* IM Total automática */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>IM Expedição/sem</div>
                <div style={{ color: blue, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{fmtInt(imExpSemana)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>da aba Tradepack</div>
              </div>
              <div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>IM Packs/sem</div>
                <div style={{ color: gold, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{fmtInt(r.imTotal_semana)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>incl. Enhanced + Plunder</div>
              </div>
              <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>IM Total (automático)</div>
                <div style={{ color: green, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{fmtInt(imExpSemana + r.imTotal_semana)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>Exp + Packs</div>
              </div>
            </div>

            {/* Pool Rate calculado */}
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>Pool Rate calculado</div>
                  <div style={{ color: "#505060", fontSize: 10 }}>{calQUEST} QUEST ÷ {fmtInt(imExpSemana + r.imTotal_semana)} IM</div>
                </div>
                <div style={{ color: green, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{(calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(8)}</div>
              </div>
            </div>

            <button onClick={() => setPoolRate(parseFloat((calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(9)))}
              style={{ width: "100%", background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.08))", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 8, color: green, padding: "11px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.06em" }}>
              ✅ Aplicar Pool Rate: {(calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(8)}
            </button>
          </Section>

          <Section title="Última Calibração Aplicada" icon="📅">
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14, fontSize: 11, color: dim, lineHeight: 1.8 }}>
              <div style={{ color: gold, marginBottom: 8, fontFamily: "'Cinzel', serif", fontSize: 12 }}>Dados ativos no modelo</div>
              <div>IM Expedição/sem: <span style={{ color: blue }}>{fmtInt(imExpSemana)}</span></div>
              <div>IM Packs/sem: <span style={{ color: gold }}>{fmtInt(r.imTotal_semana)}</span></div>
              <div>IM Total: <span style={{ color: green }}>{fmtInt(imExpSemana + r.imTotal_semana)}</span></div>
              <div>QUEST recebido: <span style={{ color: green }}>{fmtInt(calQUEST)}</span></div>
              <div>Pool Rate ativo: <span style={{ color: green }}>{poolRate.toFixed(8)}</span></div>
              <div>IM/Pack: <span style={{ color: green }}>silver × 10 (automático)</span></div>
              <div style={{ marginTop: 8, color: "#404050" }}>Atualize toda sexta após o pagamento — insira o QUEST recebido e clique em Aplicar.</div>
            </div>
          </Section>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(196,160,80,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(196,160,80,0.3))" }} />
          <span style={{ color: "rgba(196,160,80,0.4)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>ToilZero · Tradepack Prime Calculator</span>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(196,160,80,0.3))" }} />
        </div>
      </div>
    </div>
  );
}
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

// Helper para inputs numéricos inline (fora do componente Field)
// Mesmo comportamento: digita livremente, converte no onBlur
function NumInput({ value, onChange, min = 0, max, style, placeholder, format }) {
  const [local, setLocal] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setLocal(String(value));
  }, [value, focused]);

  const commit = (raw) => {
    const parsed = parseFloat(String(raw).replace(",", "."));
    let final = isNaN(parsed) ? (min ?? 0) : parsed;
    if (max !== undefined) final = Math.min(final, max);
    if (min !== undefined) final = Math.max(final, min);
    onChange(final);
    setLocal(String(final));
  };

  // Mostra valor formatado quando não está em foco
  const displayValue = focused
    ? local
    : (format ? format(value) : (value === 0 ? "0" : fmtInt(value)));

  return (
    <input
      type="text"
      inputMode="decimal"
      placeholder={placeholder || "0"}
      value={displayValue}
      onChange={e => { setLocal(e.target.value); const p = parseFloat(e.target.value.replace(",",".")); if (!isNaN(p)) onChange(p); }}
      onFocus={() => { setFocused(true); setLocal(String(value)); }}
      onBlur={() => { setFocused(false); commit(local); }}
      style={style}
    />
  );
}
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
    width: "100%", background: BG_CARD,
    border: `1px solid ${hasError ? "rgba(248,113,113,0.6)" : "rgba(96,165,250,0.15)"}`,
    borderRadius: 8, color: TEXT_PRIM, padding: "12px 16px", fontSize: 14,
    fontFamily: "'Space Mono', monospace", outline: "none",
    boxSizing: "border-box", marginBottom: 10,
  });

  return (
    <div style={{ minHeight: "100vh", background: BG_DEEP, backgroundImage: "radial-gradient(ellipse at 50% 30%, rgba(30,58,95,0.4) 0%, transparent 65%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ background: BG_SURFACE, border: "1px solid rgba(96,165,250,0.12)", borderRadius: 16, padding: "40px 48px", textAlign: "center", width: 380 }}>

        {/* Logo RavenLab */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 120, height: 120, objectFit: "contain" }} />
        </div>

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(96,165,250,0.4)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 32 }}>RavenQuest · Economy Intelligence</div>

        {/* LOGIN */}
        {modo === "login" && <>
          <input type="email" placeholder="Seu email de acesso" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle(false)} />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "VERIFICANDO..." : "ENTRAR →"}
          </button>
          <button onClick={() => { setModo("forgot"); setErro(""); }} style={{ background: "none", border: "none", color: "rgba(96,165,250,0.45)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>
            Esqueci minha senha
          </button>
        </>}

        {/* ESQUECI MINHA SENHA */}
        {modo === "forgot" && <>
          <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Informe seu email. Você receberá um código de 6 dígitos para redefinir a senha.
          </div>
          <input type="email" placeholder="Seu email de acesso" value={emailRecovery} onChange={e => setEmailRecovery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleForgot()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleForgot} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "ENVIANDO..." : "ENVIAR CÓDIGO →"}
          </button>
          <button onClick={() => { setModo("login"); setErro(""); }} style={{ background: "none", border: "none", color: "rgba(96,165,250,0.45)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
            ← Voltar ao login
          </button>
        </>}

        {/* INSERIR CÓDIGO OTP */}
        {modo === "otp" && <>
          <div style={{ color: green, fontSize: 11, marginBottom: 16 }}>✅ Email enviado para {emailRecovery}</div>
          <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Insira o código de 6 dígitos recebido no email.
          </div>
          <input type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="one-time-code" placeholder="Código de 6 dígitos" value={otpCode} onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))} onKeyDown={e => e.key === "Enter" && handleOtp()}
            style={{ ...inputStyle(!!erro), fontSize: 24, letterSpacing: "0.3em", textAlign: "center" }} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleOtp} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em", marginBottom: 12 }}>
            {loading ? "VERIFICANDO..." : "VERIFICAR CÓDIGO →"}
          </button>
          <button onClick={() => { setModo("forgot"); setErro(""); setOtpCode(""); }} style={{ background: "none", border: "none", color: "rgba(96,165,250,0.45)", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
            ← Reenviar código
          </button>
        </>}

        {/* NOVA SENHA */}
        {modo === "newpassword" && <>
          <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
            Código verificado. Defina sua nova senha.
          </div>
          <input type="password" placeholder="Nova senha (mín. 6 caracteres)" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} style={inputStyle(false)} />
          <input type="password" placeholder="Confirmar senha" value={confirmar} onChange={e => setConfirmar(e.target.value)} onKeyDown={e => e.key === "Enter" && handleNewPassword()} style={inputStyle(!!erro)} />
          {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
          <button onClick={handleNewPassword} disabled={loading} style={{ width: "100%", background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: loading ? "#888" : "#000", padding: "12px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", letterSpacing: "0.08em" }}>
            {loading ? "SALVANDO..." : "SALVAR NOVA SENHA →"}
          </button>
        </>}

        <div style={{ color: "rgba(96,165,250,0.2)", fontSize: 10, marginTop: 24, letterSpacing: "0.1em" }}>ToilZero · RavenLab · Acesso restrito</div>
      </div>
    </div>
  );
}

const fmt = (n, d = 2) => n == null ? "—" : n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Math.round(n).toLocaleString("pt-BR");
const fmtUSD = (n) => `$${fmt(Math.abs(n), 3)}`;
const green = "#4ade80", red = "#f87171", gold = "#c4a050", blue = "#60a5fa", dim = "#8fa0b8", purple = "#a78bfa", orange = "#fb923c";
const pc = (v) => v > 0 ? green : v < 0 ? red : "#e0eaf8";

// Aether Blue palette
const BG_DEEP    = "#050810";
const BG_SURFACE = "#080f1e";
const BG_CARD    = "#0d1525";
const BG_ACCENT  = "#1e3a5f";
const TEXT_PRIM  = "#e0eaf8";
const TEXT_DIM   = "#8fa0b8";

// ── CRAFTING DATABASE ─────────────────────────────────────────────────────
const CRAFTING_DB = {
  Alchemy: [
    { nome: "Lesser Arcane Energy Tonic", nivel: 4,  baseTax: 45,   exp: 187,  qty: 3, materiais: [{ nome: "Refreshing Leaf", qtd: 6 }, { nome: "Earthy Stem", qtd: 4 }, { nome: "Purified Alcohol", qtd: 1 }] },
    { nome: "Lesser Strengthening Tonic", nivel: 5,  baseTax: 66,   exp: 275,  qty: 3, materiais: [{ nome: "Refreshing Leaf", qtd: 8 }, { nome: "Thin Roots", qtd: 8 }, { nome: "Purified Oil", qtd: 1 }] },
    { nome: "Lesser Enlightenment Tonic", nivel: 6,  baseTax: 59,   exp: 243,  qty: 3, materiais: [{ nome: "Cerulean Cap", qtd: 6 }, { nome: "Refreshing Leaf", qtd: 6 }, { nome: "Purified Alcohol", qtd: 1 }] },
    { nome: "Lesser Rejuvenation Tonic",  nivel: 7,  baseTax: 90,   exp: 375,  qty: 3, materiais: [{ nome: "Toadchew", qtd: 8 }, { nome: "Fungal Dust", qtd: 12 }, { nome: "Purified Oil", qtd: 1 }] },
    { nome: "Lesser Wellspring Tonic",    nivel: 8,  baseTax: 68,   exp: 281,  qty: 3, materiais: [{ nome: "Cerulean Cap", qtd: 8 }, { nome: "Fungal Dust", qtd: 6 }, { nome: "Purified Alcohol", qtd: 1 }] },
    { nome: "Lesser Mountainheart Tonic", nivel: 9,  baseTax: 105,  exp: 437,  qty: 3, materiais: [{ nome: "Pirate's Bliss", qtd: 8 }, { nome: "Refreshing Leaf", qtd: 6 }, { nome: "Purified Oil", qtd: 1 }] },
    { nome: "Lesser Arcana Tonic",        nivel: 11, baseTax: 87,   exp: 362,  qty: 3, materiais: [{ nome: "Juicy Stem", qtd: 8 }, { nome: "Emerald Spores", qtd: 6 }, { nome: "Purified Alcohol", qtd: 1 }] },
    { nome: "Lesser Champion's Tonic",   nivel: 14, baseTax: 122,  exp: 506,  qty: 3, materiais: [{ nome: "Brightday", qtd: 8 }, { nome: "Shimmering Spores", qtd: 10 }, { nome: "Purified Oil", qtd: 1 }] },
    { nome: "Arcane Energy Tonic",        nivel: 16, baseTax: 150,  exp: 625,  qty: 3, materiais: [{ nome: "Lesser Arcane Energy Tonic", qtd: 1 }, { nome: "Emerald Spores", qtd: 14 }, { nome: "Earthy Stem", qtd: 14 }, { nome: "Acid", qtd: 1 }] },
    { nome: "Strengthening Tonic",        nivel: 17, baseTax: 150,  exp: 625,  qty: 3, materiais: [{ nome: "Lesser Strengthening Tonic", qtd: 1 }, { nome: "Shimmering Spores", qtd: 14 }, { nome: "Earthy Stem", qtd: 12 }, { nome: "Alkali", qtd: 1 }] },
    { nome: "Enlightenment Tonic",        nivel: 19, baseTax: 168,  exp: 700,  qty: 3, materiais: [{ nome: "Lesser Enlightenment Tonic", qtd: 1 }, { nome: "Bloody Bud", qtd: 8 }, { nome: "Thorny Roots", qtd: 8 }, { nome: "Alkali", qtd: 1 }] },
    { nome: "Rejuvenation Tonic",         nivel: 21, baseTax: 198,  exp: 825,  qty: 3, materiais: [{ nome: "Lesser Rejuvenation Tonic", qtd: 1 }, { nome: "Juicy Roots", qtd: 16 }, { nome: "Green Cap", qtd: 12 }, { nome: "Alkali", qtd: 1 }] },
    { nome: "Wellspring Tonic",           nivel: 22, baseTax: 203,  exp: 843,  qty: 3, materiais: [{ nome: "Lesser Wellspring Tonic", qtd: 1 }, { nome: "Pirate's Cap", qtd: 14 }, { nome: "Thin Roots", qtd: 8 }, { nome: "Acid", qtd: 1 }] },
    { nome: "Mountainheart Tonic",        nivel: 24, baseTax: 213,  exp: 887,  qty: 3, materiais: [{ nome: "Lesser Mountainheart Tonic", qtd: 1 }, { nome: "Juicy Roots", qtd: 16 }, { nome: "Emerald Spores", qtd: 14 }, { nome: "Alkali", qtd: 1 }] },
    { nome: "Arcana Tonic",               nivel: 27, baseTax: 300,  exp: 1250, qty: 3, materiais: [{ nome: "Lesser Arcana Tonic", qtd: 1 }, { nome: "Brightday", qtd: 24 }, { nome: "Fungal Dust", qtd: 30 }, { nome: "Alkali", qtd: 1 }] },
    { nome: "Champion's Tonic",          nivel: 28, baseTax: 315,  exp: 1312, qty: 3, materiais: [{ nome: "Lesser Champion's Tonic", qtd: 1 }, { nome: "Toadchew", qtd: 20 }, { nome: "Juicy Stem", qtd: 26 }, { nome: "Acid", qtd: 1 }] },
    { nome: "Mana Surge Tonic",           nivel: 35, baseTax: 324,  exp: 1350, qty: 3, materiais: [{ nome: "Wellspring Tonic", qtd: 1 }, { nome: "Bloody Bud", qtd: 4 }, { nome: "Dry Stem", qtd: 12 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Nimble Grace Tonic",         nivel: 35, baseTax: 360,  exp: 1500, qty: 3, materiais: [{ nome: "Champion's Tonic", qtd: 1 }, { nome: "Bloody Bud", qtd: 4 }, { nome: "Pirate's Bliss", qtd: 16 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Mighty Impact Tonic",        nivel: 37, baseTax: 408,  exp: 1700, qty: 3, materiais: [{ nome: "Champion's Tonic", qtd: 1 }, { nome: "Numbing Thorns", qtd: 12 }, { nome: "Juicy Stem", qtd: 16 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Iron Will Tonic",            nivel: 45, baseTax: 414,  exp: 1725, qty: 3, materiais: [{ nome: "Strengthening Tonic", qtd: 1 }, { nome: "Glowing Spores", qtd: 16 }, { nome: "Chest Warmer", qtd: 6 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Profound Insight Tonic",     nivel: 48, baseTax: 609,  exp: 2537, qty: 3, materiais: [{ nome: "Arcana Tonic", qtd: 1 }, { nome: "Rejuvenation Tonic", qtd: 1 }, { nome: "Lizard's Delight", qtd: 24 }, { nome: "Chest Warmer", qtd: 14 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Light of Dawn Tonic",        nivel: 51, baseTax: 567,  exp: 2362, qty: 3, materiais: [{ nome: "Enlightenment Tonic", qtd: 1 }, { nome: "Glowing Spores", qtd: 16 }, { nome: "Hagthorn", qtd: 10 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Arcane Mastery Tonic",       nivel: 55, baseTax: 684,  exp: 2850, qty: 3, materiais: [{ nome: "Arcane Energy Tonic", qtd: 1 }, { nome: "Twisted Flower", qtd: 10 }, { nome: "Hagthorn", qtd: 16 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Dark Pact Tonic",            nivel: 57, baseTax: 585,  exp: 2437, qty: 3, materiais: [{ nome: "Light of Dawn Tonic", qtd: 1 }, { nome: "Catalytic Solution", qtd: 6 }, { nome: "Bloody Chalice", qtd: 20 }, { nome: "Acid", qtd: 4 }] },
    { nome: "Chillguard Tonic",           nivel: 59, baseTax: 900,  exp: 3750, qty: 3, materiais: [{ nome: "Arcane Energy Tonic", qtd: 1 }, { nome: "Mountainheart Tonic", qtd: 1 }, { nome: "Dusk Dust", qtd: 20 }, { nome: "Cold Roots", qtd: 20 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Burning Aegis Tonic",        nivel: 61, baseTax: 1008, exp: 4200, qty: 3, materiais: [{ nome: "Arcana Tonic", qtd: 1 }, { nome: "Mountainheart Tonic", qtd: 1 }, { nome: "Dusk Dust", qtd: 16 }, { nome: "Fire Cap", qtd: 18 }, { nome: "Catalytic Solution", qtd: 1 }] },
    { nome: "Wealthbringer's Tonic",     nivel: 70, baseTax: 1152, exp: 4800, qty: 1, materiais: [{ nome: "Brightday", qtd: 52 }, { nome: "Ambar Dust", qtd: 40 }, { nome: "Core Essence", qtd: 1 }] },
    { nome: "Purifying Tonic",            nivel: 70, baseTax: 720,  exp: 3000, qty: 1, materiais: [{ nome: "Chest Warmer", qtd: 16 }, { nome: "Pirate's Bliss", qtd: 16 }, { nome: "Core Essence", qtd: 1 }] },
    { nome: "Serendipity Draught",        nivel: 78, baseTax: 2334, exp: 9725, qty: 1, materiais: [{ nome: "Wealthbringer's Tonic", qtd: 1 }, { nome: "Tonic of Forbidden Knowledge", qtd: 1 }, { nome: "Mixing Agent", qtd: 2 }] },
  ],
  Blacksmithing: [
    { nome: "Copper Ingot",     nivel: 1,  baseTax: 29,  exp: 120,  qty: 1, materiais: [{ nome: "Copper Ore", qtd: 5 }] },
    { nome: "Bronze Ingot",     nivel: 10, baseTax: 40,  exp: 165,  qty: 1, materiais: [{ nome: "Copper Ore", qtd: 2 }, { nome: "Tin Ore", qtd: 3 }] },
    { nome: "Iron Ingot",       nivel: 20, baseTax: 48,  exp: 200,  qty: 1, materiais: [{ nome: "Iron Ore", qtd: 5 }] },
    { nome: "Steel Ingot",      nivel: 30, baseTax: 69,  exp: 287,  qty: 1, materiais: [{ nome: "Iron Ore", qtd: 5 }, { nome: "Coal", qtd: 2 }] },
    { nome: "Cobalt Ingot",     nivel: 50, baseTax: 99,  exp: 412,  qty: 1, materiais: [{ nome: "Cobalt Ore", qtd: 5 }, { nome: "Coal", qtd: 3 }] },
    { nome: "Titanium Ingot",   nivel: 70, baseTax: 156, exp: 650,  qty: 1, materiais: [{ nome: "Titanium Ore", qtd: 5 }, { nome: "Coal", qtd: 4 }] },
    { nome: "Glimmery Ingot",   nivel: 88, baseTax: 480, exp: 2000, qty: 1, materiais: [{ nome: "Titanium Ingot", qtd: 6 }, { nome: "Cobalt Ingot", qtd: 4 }, { nome: "Binding Aether", qtd: 1 }] },
    { nome: "Copper Whetstone", nivel: 1,  baseTax: 38,  exp: 157,  qty: 1, materiais: [{ nome: "Copper Ingot", qtd: 2 }, { nome: "Small Log", qtd: 4 }] },
    { nome: "Bronze Whetstone", nivel: 10, baseTax: 75,  exp: 312,  qty: 1, materiais: [{ nome: "Bronze Ingot", qtd: 2 }, { nome: "Rough Plank", qtd: 2 }] },
    { nome: "Iron Whetstone",   nivel: 20, baseTax: 96,  exp: 400,  qty: 1, materiais: [{ nome: "Iron Ingot", qtd: 2 }, { nome: "Rough Plank", qtd: 3 }] },
    { nome: "Steel Whetstone",  nivel: 30, baseTax: 146, exp: 608,  qty: 1, materiais: [{ nome: "Steel Ingot", qtd: 2 }, { nome: "Refined Plank", qtd: 2 }] },
    { nome: "Dense Whetstone",  nivel: 50, baseTax: 197, exp: 820,  qty: 1, materiais: [{ nome: "Cobalt Ingot", qtd: 2 }, { nome: "Treated Plank", qtd: 2 }] },
    { nome: "Fishing Hook T1",  nivel: 1,  baseTax: 15,  exp: 62,   qty: 1, materiais: [{ nome: "Copper Ingot", qtd: 1 }, { nome: "Small Log", qtd: 2 }] },
    { nome: "Fishing Hook T2",  nivel: 20, baseTax: 53,  exp: 220,  qty: 1, materiais: [{ nome: "Iron Ingot", qtd: 1 }, { nome: "Refined Plank", qtd: 1 }] },
    { nome: "Fishing Hook T3",  nivel: 40, baseTax: 98,  exp: 408,  qty: 1, materiais: [{ nome: "Steel Ingot", qtd: 1 }, { nome: "Treated Plank", qtd: 1 }, { nome: "Coal", qtd: 2 }] },
  ],
  Cooking: [
    { nome: "Vodka",              nivel: 1,  baseTax: 30,   exp: 125,  qty: 5, materiais: [{ nome: "Potato", qtd: 10 }] },
    { nome: "Beer",               nivel: 5,  baseTax: 69,   exp: 287,  qty: 5, materiais: [{ nome: "Wheat", qtd: 8 }] },
    { nome: "Landing Brandy",     nivel: 10, baseTax: 113,  exp: 468,  qty: 5, materiais: [{ nome: "Apple", qtd: 2 }] },
    { nome: "Wine",               nivel: 20, baseTax: 180,  exp: 750,  qty: 5, materiais: [{ nome: "Grape", qtd: 8 }, { nome: "Brewer Yeast", qtd: 2 }] },
    { nome: "Whiskey",            nivel: 22, baseTax: 219,  exp: 912,  qty: 5, materiais: [{ nome: "Corn", qtd: 12 }, { nome: "Brewer Yeast", qtd: 1 }] },
    { nome: "Orange Liqueur",     nivel: 30, baseTax: 450,  exp: 1875, qty: 5, materiais: [{ nome: "Orange", qtd: 4 }, { nome: "Brewer Yeast", qtd: 1 }] },
    { nome: "Rum",                nivel: 32, baseTax: 399,  exp: 1662, qty: 5, materiais: [{ nome: "Apple", qtd: 6 }, { nome: "Brewer Yeast", qtd: 2 }] },
    { nome: "Blueberry Wine",     nivel: 40, baseTax: 578,  exp: 2406, qty: 5, materiais: [{ nome: "Grape", qtd: 20 }, { nome: "Blueberry", qtd: 40 }, { nome: "Brewer Yeast", qtd: 2 }] },
    { nome: "Boozemelon",         nivel: 42, baseTax: 612,  exp: 2550, qty: 5, materiais: [{ nome: "Watermelon", qtd: 6 }, { nome: "Pumpkin", qtd: 2 }, { nome: "Brewer Yeast", qtd: 3 }] },
    { nome: "Spiced Rum",         nivel: 55, baseTax: 936,  exp: 3900, qty: 5, materiais: [{ nome: "Apple", qtd: 12 }, { nome: "Pepper", qtd: 12 }, { nome: "Brewer Yeast", qtd: 2 }] },
    { nome: "Banana Vodka",       nivel: 57, baseTax: 981,  exp: 4087, qty: 5, materiais: [{ nome: "Potato", qtd: 50 }, { nome: "Banana", qtd: 10 }, { nome: "Brewer Yeast", qtd: 2 }] },
    { nome: "Strawberry Whiskey", nivel: 72, baseTax: 1890, exp: 7875, qty: 5, materiais: [{ nome: "Corn", qtd: 48 }, { nome: "Strawberry", qtd: 70 }, { nome: "Brewer Yeast", qtd: 7 }, { nome: "Honey", qtd: 20 }] },
    { nome: "Fermented Liquor",   nivel: 78, baseTax: 2160, exp: 9000, qty: 5, materiais: [{ nome: "Herbal Alcohol", qtd: 1 }, { nome: "Watermelon", qtd: 10 }, { nome: "Brewer Yeast", qtd: 5 }] },
  ],
  Carpentry: [
    { nome: "Rough Plank",   nivel: 1,  baseTax: 53,  exp: 220,  qty: 1, materiais: [{ nome: "Small Log", qtd: 12 }] },
    { nome: "Dense Plank",   nivel: 10, baseTax: 255, exp: 1062, qty: 1, materiais: [{ nome: "Dense Log", qtd: 8 }] },
    { nome: "Refined Plank", nivel: 10, baseTax: 96,  exp: 400,  qty: 1, materiais: [{ nome: "Heavy Log", qtd: 8 }] },
    { nome: "Treated Plank", nivel: 25, baseTax: 165, exp: 687,  qty: 1, materiais: [{ nome: "Heavy Log", qtd: 12 }, { nome: "Oil", qtd: 2 }] },
    { nome: "Heavy Plank",   nivel: 30, baseTax: 534, exp: 2225, qty: 1, materiais: [{ nome: "Dense Log", qtd: 16 }, { nome: "Oil", qtd: 2 }] },
    { nome: "Sturdy Plank",  nivel: 50, baseTax: 197, exp: 818,  qty: 1, materiais: [{ nome: "Sturdy Log", qtd: 10 }, { nome: "Oil", qtd: 4 }] },
    { nome: "Fishing Rod T1",nivel: 5,  baseTax: 107, exp: 445,  qty: 1, materiais: [{ nome: "Rough Plank", qtd: 3 }, { nome: "Copper Ingot", qtd: 1 }, { nome: "Coarse Thread", qtd: 2 }] },
    { nome: "Fishing Rod T2",nivel: 25, baseTax: 197, exp: 820,  qty: 1, materiais: [{ nome: "Refined Plank", qtd: 3 }, { nome: "Iron Ingot", qtd: 1 }, { nome: "Linen Cloth", qtd: 2 }] },
    { nome: "Fishing Rod T3",nivel: 45, baseTax: 380, exp: 1583, qty: 1, materiais: [{ nome: "Treated Plank", qtd: 3 }, { nome: "Steel Ingot", qtd: 1 }, { nome: "Bolted Cloth", qtd: 2 }] },
    { nome: "Short Bow",     nivel: 10, baseTax: 144, exp: 600,  qty: 1, materiais: [{ nome: "Rough Plank", qtd: 4 }, { nome: "Coarse Thread", qtd: 4 }] },
    { nome: "Long Bow",      nivel: 30, baseTax: 285, exp: 1187, qty: 1, materiais: [{ nome: "Refined Plank", qtd: 4 }, { nome: "Linen Cloth", qtd: 3 }, { nome: "Iron Ingot", qtd: 1 }] },
    { nome: "Arcane Staff",  nivel: 30, baseTax: 285, exp: 1187, qty: 1, materiais: [{ nome: "Treated Plank", qtd: 3 }, { nome: "Linen Cloth", qtd: 2 }, { nome: "Iron Ingot", qtd: 1 }] },
  ],
  Weaving: [
    { nome: "Coarse Thread",  nivel: 1,  baseTax: 19,  exp: 78,   qty: 1, materiais: [{ nome: "Cotton", qtd: 4 }] },
    { nome: "Linen Cloth",    nivel: 1,  baseTax: 53,  exp: 220,  qty: 1, materiais: [{ nome: "Cotton", qtd: 8 }, { nome: "Coarse Thread", qtd: 2 }] },
    { nome: "Tanned Leather", nivel: 10, baseTax: 96,  exp: 400,  qty: 1, materiais: [{ nome: "Rawhide", qtd: 6 }] },
    { nome: "Thick Leather",  nivel: 25, baseTax: 165, exp: 687,  qty: 1, materiais: [{ nome: "Tanned Leather", qtd: 3 }, { nome: "Tallow", qtd: 2 }] },
    { nome: "Bolted Cloth",   nivel: 25, baseTax: 165, exp: 687,  qty: 1, materiais: [{ nome: "Linen Cloth", qtd: 3 }, { nome: "Coarse Thread", qtd: 4 }] },
    { nome: "Silk",           nivel: 50, baseTax: 285, exp: 1187, qty: 1, materiais: [{ nome: "Silkworm Cocoon", qtd: 8 }, { nome: "Coarse Thread", qtd: 2 }] },
    { nome: "Tanned Silk",    nivel: 50, baseTax: 285, exp: 1187, qty: 1, materiais: [{ nome: "Silk", qtd: 2 }, { nome: "Tallow", qtd: 3 }] },
    { nome: "Light Armor T2", nivel: 20, baseTax: 210, exp: 875,  qty: 1, materiais: [{ nome: "Tanned Leather", qtd: 4 }, { nome: "Linen Cloth", qtd: 3 }, { nome: "Coarse Thread", qtd: 4 }] },
    { nome: "Light Armor T3", nivel: 40, baseTax: 405, exp: 1687, qty: 1, materiais: [{ nome: "Thick Leather", qtd: 4 }, { nome: "Bolted Cloth", qtd: 3 }, { nome: "Linen Cloth", qtd: 2 }] },
    { nome: "Moa Saddle T1",  nivel: 10, baseTax: 144, exp: 600,  qty: 1, materiais: [{ nome: "Tanned Leather", qtd: 5 }, { nome: "Coarse Thread", qtd: 4 }] },
    { nome: "Moa Saddle T2",  nivel: 30, baseTax: 285, exp: 1187, qty: 1, materiais: [{ nome: "Thick Leather", qtd: 5 }, { nome: "Bolted Cloth", qtd: 2 }, { nome: "Linen Cloth", qtd: 2 }] },
  ],
};

const PROF_ICONS = { Alchemy: "⚗️", Blacksmithing: "⚒️", Cooking: "🍳", Carpentry: "🪵", Weaving: "🧵" };

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
  const [localValue, setLocalValue] = useState(String(value));
  const [focused, setFocused] = useState(false);

  // Sincroniza valor externo quando não está em foco
  useEffect(() => {
    if (!focused) setLocalValue(String(value));
  }, [value, focused]);

  const handleChange = (e) => {
    // Permite digitar livremente: números, ponto, vírgula, sinal negativo
    const raw = e.target.value.replace(",", ".");
    setLocalValue(e.target.value);
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) onChange(parsed);
  };

  const handleBlur = () => {
    setFocused(false);
    const parsed = parseFloat(localValue.replace(",", "."));
    const final = isNaN(parsed) ? (min ?? 0) : parsed;
    onChange(final);
    setLocalValue(String(final));
  };

  const displayValue = focused ? localValue : fmtInt(value);

  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => { setFocused(true); setLocalValue(String(value)); }}
          onBlur={handleBlur}
          style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${color ? color + "55" : "rgba(196,160,80,0.3)"}`, borderRadius: 6, color: color || "#f0e6c8", padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }}
        />
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
  const [showTutorial, setShowTutorial] = useState(false);
  const TUTORIAL_VIDEO_ID = "cwqri68Q6YI";

  // Estados de Crafting / Oversupply
  const [craftPlayerLevel, setCraftPlayerLevel] = useState(50);
  const [craftOversupply, setCraftOversupply]   = useState(0);
  const [craftProfTab, setCraftProfTab]         = useState("Alchemy");
  const [craftPrices, setCraftPrices]           = useState({});
  const [craftMaterialPrices, setCraftMaterialPrices] = useState({});

  // Função de logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAutenticado(false);
    setUserEmail(""); setUserId(""); setSessionAtual(""); setExpiresAt(null);
    setShowTutorial(false);
  };

  // Abre tutorial na primeira vez que o usuário acessa
  useEffect(() => {
    if (!autenticado || !userId) return;
    const tutorialVisto = localStorage.getItem(`tutorial_visto_${userId}`);
    if (!tutorialVisto) setShowTutorial(true);
  }, [autenticado, userId]);

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
  const [questToSilver, setQuestToSilver] = useState(65018);

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

  // ── INFUSIONS ─────────────────────────────────────────────────────────────
  const INFUSIONS = [
    { nome: "Infusion",           exp: 10,  tipo: "terra" },
    { nome: "Warband Infusion",   exp: 20,  tipo: "terra" },
    { nome: "Ancient Infusion",   exp: 40,  tipo: "terra" },
    { nome: "Carved Infusion",    exp: 60,  tipo: "terra" },
    { nome: "Ghostly Infusion",   exp: 75,  tipo: "terra" },
    { nome: "Ornate Infusion",    exp: 90,  tipo: "terra" },
    { nome: "Radiant Infusion",   exp: 105, tipo: "terra" },
    { nome: "Tidal Infusion",     exp: 45,  tipo: "mar"   },
    { nome: "Abyssal Infusion",   exp: 275, tipo: "mar"   },
    { nome: "Oceanic Infusion",   exp: 125, tipo: "mar"   },
    { nome: "Maelstrom Infusion", exp: 550, tipo: "mar"   },
  ];

  const [infusionPrecos, setInfusionPrecos] = useState(
    Object.fromEntries(INFUSIONS.map(i => [i.nome, 0]))
  );
  const [infusionTargetEXP, setInfusionTargetEXP] = useState(10000);
  const [infusionQtdHora, setInfusionQtdHora] = useState(
    Object.fromEntries(INFUSIONS.map(i => [i.nome, 0]))
  );
  const [infusionCompra, setInfusionCompra] = useState(
    Object.fromEntries(INFUSIONS.map(i => [i.nome, 0]))
  );
  const [taxaMkt, setTaxaMkt] = useState(5);

  const setInfusionPreco = (nome, val) =>
    setInfusionPrecos(prev => ({ ...prev, [nome]: val }));
  const setInfusionQtd = (nome, val) =>
    setInfusionQtdHora(prev => ({ ...prev, [nome]: val }));
  const setInfusionBuy = (nome, val) =>
    setInfusionCompra(prev => ({ ...prev, [nome]: val }));

  const infusionRanking = INFUSIONS
    .map(inf => {
      const preco = infusionPrecos[inf.nome] || 0;
      const silverPerExp = preco > 0 ? preco / inf.exp : Infinity;
      const qtdNecessaria = preco > 0 ? Math.ceil(infusionTargetEXP / inf.exp) : 0;
      const custoTotal = qtdNecessaria * preco;
      return { ...inf, preco, silverPerExp, qtdNecessaria, custoTotal };
    })
    .sort((a, b) => a.silverPerExp - b.silverPerExp);

  const melhorInfusion = infusionRanking.find(i => i.preco > 0);

  // Ranking de Hunt — silver/hora = qtd_por_hora × preço_mkt
  const huntDropRanking = INFUSIONS
    .map(inf => {
      const qtd = infusionQtdHora[inf.nome] || 0;
      const preco = infusionPrecos[inf.nome] || 0;
      const silverHora = qtd * preco;
      return { ...inf, qtd, preco, silverHora };
    })
    .filter(i => i.silverHora > 0)
    .sort((a, b) => b.silverHora - a.silverHora);

  // Ranking de Flip — lucro = preço_venda × (1 - taxa%) - preço_compra
  const flipRanking = INFUSIONS
    .map(inf => {
      const venda = infusionPrecos[inf.nome] || 0;
      const compra = infusionCompra[inf.nome] || 0;
      const lucroUnit = venda > 0 && compra > 0
        ? venda * (1 - taxaMkt / 100) - compra : 0;
      const margemPct = compra > 0 && lucroUnit > 0
        ? (lucroUnit / compra) * 100 : 0;
      return { ...inf, venda, compra, lucroUnit, margemPct };
    })
    .filter(i => i.lucroUnit > 0)
    .sort((a, b) => b.margemPct - a.margemPct);

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
        if (s.infusionPrecos !== undefined) setInfusionPrecos(s.infusionPrecos);
        if (s.infusionTargetEXP !== undefined) setInfusionTargetEXP(s.infusionTargetEXP);
        if (s.infusionQtdHora !== undefined) setInfusionQtdHora(s.infusionQtdHora);
        if (s.infusionCompra !== undefined) setInfusionCompra(s.infusionCompra);
        if (s.taxaMkt !== undefined) setTaxaMkt(s.taxaMkt);
        if (s.craftPlayerLevel !== undefined) setCraftPlayerLevel(s.craftPlayerLevel);
        if (s.craftOversupply !== undefined) setCraftOversupply(s.craftOversupply);
        if (s.craftPrices !== undefined) setCraftPrices(s.craftPrices);
        if (s.craftMaterialPrices !== undefined) setCraftMaterialPrices(s.craftMaterialPrices);
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
            infusionPrecos, infusionTargetEXP, infusionQtdHora, infusionCompra, taxaMkt,
            craftPlayerLevel, craftOversupply, craftPrices, craftMaterialPrices,
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
    mineHorasDia, mineOres, mineGems,
    infusionPrecos, infusionTargetEXP, infusionQtdHora, infusionCompra, taxaMkt,
    craftPlayerLevel, craftOversupply, craftPrices, craftMaterialPrices]);

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
    <div style={{ minHeight: "100vh", background: BG_DEEP, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center" }}>
        <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 16 }} />
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: TEXT_PRIM, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>RavenLab</div>
        <div style={{ color: TEXT_DIM, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}>Carregando...</div>
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
    { id: "tradepack",  label: "📦 Tradepack" },
    { id: "comparativo",label: "🏹 Hunt" },
    { id: "mercado",    label: "💰 Materiais" },
    { id: "infusion",   label: "✨ Infusion" },
    { id: "crafting",   label: "⚒️ Crafting" },
    { id: "calibracao", label: "📐 Calibração" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BG_DEEP, backgroundImage: "radial-gradient(ellipse at 20% 10%, rgba(30,58,95,0.35) 0%, transparent 55%)", fontFamily: "'Space Mono', monospace", color: TEXT_PRIM, padding: "20px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* WATERMARK */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden", opacity: 0.045 }}>
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: `${(i % 8) * 13}%`, left: `${Math.floor(i / 8) * 17}%`, transform: "rotate(-30deg)", color: "#ffffff", fontSize: 12, fontFamily: "monospace", whiteSpace: "nowrap", userSelect: "none" }}>
            {userEmail}
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(96,165,250,0.08)" }}>

        {/* Logo + Nome */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 44, height: 44, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: TEXT_PRIM, letterSpacing: "0.15em", textTransform: "uppercase" }}>RavenLab</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(96,165,250,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>RavenQuest · Economy Intelligence</div>
          </div>
        </div>

        {/* Centro: status de sync */}
        <div style={{ fontSize: 10, color: saving ? "rgba(196,160,80,0.6)" : "rgba(74,222,128,0.45)", letterSpacing: "0.1em", transition: "color 0.5s" }}>
          {dataLoading ? "⟳ carregando..." : saving ? "⟳ salvando..." : settingsLoaded ? "✓ sincronizado" : ""}
        </div>

        {/* Direita: expiração + tutorial + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {expiresAt && (() => {
            const dias = Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
            const expColor = dias <= 7 ? "#f87171" : dias <= 14 ? "#fb923c" : TEXT_DIM;
            return (
              <div style={{ fontSize: 10, color: expColor, letterSpacing: "0.06em" }}>
                {dias <= 7 && "⚠️ "}{dias > 0 ? `${dias}d restantes` : "Expirado"}
              </div>
            );
          })()}
          <button onClick={() => setShowTutorial(true)} title="Ver tutorial"
            style={{ background: "rgba(30,58,95,0.5)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 6, color: "rgba(96,165,250,0.5)", padding: "4px 10px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.05em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(30,58,95,0.8)"; e.target.style.color = "#60a5fa"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(30,58,95,0.5)"; e.target.style.color = "rgba(96,165,250,0.5)"; }}>
            ? Tutorial
          </button>
          <button onClick={handleLogout}
            style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 6, color: "rgba(248,113,113,0.5)", padding: "4px 10px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.08em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.background = "rgba(248,113,113,0.12)"; e.target.style.color = "#f87171"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(248,113,113,0.06)"; e.target.style.color = "rgba(248,113,113,0.5)"; }}>
            Sair
          </button>
        </div>
      </div>
      {/* MODAL TUTORIAL */}
      {showTutorial && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: BG_SURFACE, border: "1px solid rgba(96,165,250,0.15)", borderRadius: 16, width: "100%", maxWidth: 780 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid rgba(96,165,250,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 48, height: 48, objectFit: "contain" }} />
                <div>
                  <div style={{ fontSize: 9, color: "rgba(96,165,250,0.4)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 4 }}>Bem-vindo ao</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: TEXT_PRIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>RavenLab</div>
                </div>
              </div>
              <button onClick={() => setShowTutorial(false)} style={{ background: BG_CARD, border: "1px solid rgba(96,165,250,0.1)", borderRadius: 8, color: TEXT_DIM, padding: "6px 12px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11 }}>
                ✕ Fechar
              </button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(96,165,250,0.1)" }}>
                <iframe src={`https://www.youtube.com/embed/${TUTORIAL_VIDEO_ID}?rel=0&modestbranding=1`}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title="Tutorial - Merchant Ledger" />
              </div>
            </div>
            <div style={{ padding: "0 24px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => { localStorage.setItem(`tutorial_visto_${userId}`, "1"); setShowTutorial(false); }}
                style={{ background: "none", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 8, color: TEXT_DIM, padding: "8px 16px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11 }}>
                Não mostrar novamente
              </button>
              <button onClick={() => setShowTutorial(false)}
                style={{ background: "linear-gradient(135deg, #c4a050, #8a6a20)", border: "none", borderRadius: 8, color: "#000", padding: "10px 24px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: "bold", letterSpacing: "0.08em" }}>
                COMEÇAR →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULTADO PRINCIPAL — 3 CENÁRIOS */}
      <div style={{ background: BG_CARD, border: "1px solid rgba(96,165,250,0.1)", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
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

              {/* QUEST USD */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Preço do QUEST em USD</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <NumInput value={questUSD} onChange={v => setQuestUSD(v)} min={0}
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: "#f0e6c8", padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                  <span style={{ color: gold, fontSize: 12, whiteSpace: "nowrap" }}>USD</span>
                </div>
                <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 6, padding: "8px 12px", marginTop: 6, fontSize: 10, color: dim, lineHeight: 1.7 }}>
                  📍 Onde encontrar: <strong style={{ color: blue }}>CoinGecko</strong> ou <strong style={{ color: blue }}>CoinMarketCap</strong> → pesquise "RavenQuest QUEST" → copie o preço atual em USD
                </div>
              </div>

              {/* QUEST → Silver */}
              <div>
                <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Taxa de Câmbio: 1 QUEST → Silver</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <NumInput value={questToSilver} onChange={v => setQuestToSilver(v)} min={0}
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: "#f0e6c8", padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                  <span style={{ color: gold, fontSize: 12, whiteSpace: "nowrap" }}>silver</span>
                </div>
                <div style={{ background: "rgba(196,160,80,0.05)", border: "1px solid rgba(196,160,80,0.15)", borderRadius: 6, padding: "10px 12px", marginTop: 6, fontSize: 10, color: dim, lineHeight: 1.8 }}>
                  📍 Onde encontrar: No jogo → <strong style={{ color: gold }}>Mercado de Moedas</strong> → aba <strong style={{ color: gold }}>Mercado</strong> → selecione <strong style={{ color: gold }}>Silver</strong><br/>
                  Use o valor de <strong style={{ color: green }}>"Melhor Oferta Atual de Compra"</strong> (ex: 65.018) — é o que você recebe em silver ao vender 1 QUEST
                </div>
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
                    <NumInput value={item.qtd} onChange={v => item.setQtd(v)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <NumInput value={item.preco} onChange={v => item.setPreco(v)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 6, color: orange, padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                  </div>
                ))}

                {/* NPC */}
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 8, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ color: "#c0c0d0", fontSize: 12 }}>NPC</span>
                  <NumInput value={huntNPC} onChange={v => setHuntNPC(v)} min={0}
                    placeholder="Silver direto/hora"
                    style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "6px 10px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                </div>

                <Divider label="Projeção" />

                {/* Horas por dia */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Horas/dia:</span>
                  <NumInput value={huntHorasDia} onChange={v => setHuntHorasDia(v)} min={1} max={24}
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
                    <NumInput value={v.qtd} onChange={val => setOre(nome, "qtd", val)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <NumInput value={v.preco} onChange={val => setOre(nome, "preco", val)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 6, color: orange, padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <span style={{ color: v.qtd * v.preco > 0 ? green : "#404050", fontSize: 10, fontFamily: "'Space Mono', monospace", textAlign: "right" }}>{fmtInt(v.qtd * v.preco)}</span>
                  </div>
                ))}

                <Divider label="💎 Gemas" />

                {Object.entries(mineGems).map(([nome, v], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 60px", gap: 6, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ color: "#c0c0d0", fontSize: 11 }}>{nome}</span>
                    <NumInput value={v.qtd} onChange={val => setGem(nome, "qtd", val)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 6, color: "#f0e6c8", padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <NumInput value={v.preco} onChange={val => setGem(nome, "preco", val)} min={0}
                      style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 6, color: purple, padding: "5px 8px", fontSize: 11, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }} />
                    <span style={{ color: v.qtd * v.preco > 0 ? green : "#404050", fontSize: 10, fontFamily: "'Space Mono', monospace", textAlign: "right" }}>{fmtInt(v.qtd * v.preco)}</span>
                  </div>
                ))}

                <Divider label="Projeção" />

                {/* Horas por dia mine */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Horas/dia:</span>
                  <NumInput value={mineHorasDia} onChange={v => setMineHorasDia(v)} min={1} max={24}
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
                      <td style={{ padding: "4px 10px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={cp} onChange={v => setMat(m.nome, "custoProducao", v)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 4, color: "#f0e6c8", padding: "4px 8px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
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
                      <td style={{ padding: "4px 10px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={pm} onChange={v => setMat(m.nome, "precoMkt", v)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 4, color: orange, padding: "4px 8px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
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
      {tab === "crafting" && (() => {
        const extraTaxPct = Math.min(100, Math.floor(craftOversupply / 10) * 2);
        const itens = CRAFTING_DB[craftProfTab] || [];

        // Extrai materiais únicos da profissão atual
        const matsUnicos = [...new Set(itens.flatMap(i => i.materiais.map(m => m.nome)))].sort();

        const getMatPreco = (nome) => craftMaterialPrices[craftProfTab + "|" + nome] || 0;
        const setMatPreco = (nome, val) => setCraftMaterialPrices(p => ({ ...p, [craftProfTab + "|" + nome]: val }));
        const getCraftPrice = (nome) => craftPrices[craftProfTab + "|" + nome] || 0;
        const setCraftPrice = (nome, val) => setCraftPrices(p => ({ ...p, [craftProfTab + "|" + nome]: val }));

        const calc = itens.map(item => {
          const custoMateriais = item.materiais.reduce((acc, m) => acc + m.qtd * getMatPreco(m.nome), 0);
          const taxReal        = item.baseTax * (1 + extraTaxPct / 100);
          const custoTotal     = custoMateriais + taxReal;
          const precoVenda     = getCraftPrice(item.nome);
          const receitaTotal   = precoVenda * item.qty;
          const temDados       = precoVenda > 0 && custoMateriais > 0;
          const margem         = temDados ? receitaTotal - custoTotal : null;
          const margemPct      = margem !== null && custoTotal > 0 ? (margem / custoTotal) * 100 : null;
          const margemEXP      = margem !== null && item.exp > 0 ? margem / item.exp : null;

          // Crafts para atingir oversupply
          const threshold      = 10000 + 10000 * craftPlayerLevel;
          const expRestante100 = threshold * Math.max(0, (100 - craftOversupply) / 100);
          const expRestanteMax = threshold * Math.max(0, (500 - craftOversupply) / 100);
          const craftsParaOS   = item.exp > 0 ? Math.ceil(expRestante100 / item.exp) : null;
          const craftsParaMax  = item.exp > 0 ? Math.ceil(expRestanteMax / item.exp) : null;
          const profitAteOS    = margem !== null && craftsParaOS !== null ? margem * craftsParaOS : null;
          const profitAteMax   = margem !== null && craftsParaMax !== null ? margem * craftsParaMax : null;

          return { ...item, custoMateriais, taxReal, custoTotal, precoVenda, receitaTotal, temDados, margem, margemPct, margemEXP, craftsParaOS, craftsParaMax, profitAteOS, profitAteMax };
        });

        const comDados  = calc.filter(i => i.temDados);
        const topMargem = [...comDados].sort((a,b) => b.margem - a.margem).slice(0, 3);
        const topPct    = [...comDados].sort((a,b) => b.margemPct - a.margemPct).slice(0, 3);
        const topEXP    = [...comDados].sort((a,b) => b.margemEXP - a.margemEXP).slice(0, 3);

        const allMatsFilled = matsUnicos.length > 0 && matsUnicos.every(m => getMatPreco(m) > 0);

        return (
          <div>
            <Section title="Crafting — Oversupply Calculator" icon="⚒️" borderColor="rgba(196,160,80,0.4)">

              {/* CONFIG TOPO */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>
                <div>
                  <div style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Nível do Player</div>
                  <NumInput value={craftPlayerLevel} onChange={v => setCraftPlayerLevel(Math.max(1, Math.min(100, v)))} min={1} max={100}
                    style={{ background: BG_CARD, border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: TEXT_PRIM, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono',monospace", outline: "none" }} />
                  <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 4 }}>Threshold: {fmtInt(10000 + 10000 * craftPlayerLevel)} EXP</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Oversupply Atual (%)</div>
                  <NumInput value={craftOversupply} onChange={v => setCraftOversupply(Math.max(0, Math.min(500, v)))} min={0} max={500}
                    style={{ background: BG_CARD, border: `1px solid ${craftOversupply >= 200 ? "rgba(248,113,113,0.5)" : craftOversupply >= 100 ? "rgba(251,146,60,0.5)" : "rgba(74,222,128,0.4)"}`, borderRadius: 6, color: craftOversupply >= 200 ? red : craftOversupply >= 100 ? orange : green, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono',monospace", outline: "none" }} />
                  <div style={{ fontSize: 10, color: craftOversupply >= 200 ? red : craftOversupply >= 100 ? orange : green, marginTop: 4 }}>
                    Tax extra: +{extraTaxPct}% {craftOversupply === 0 ? "✅ Sem penalidade" : craftOversupply >= 500 ? "🔴 MAX" : ""}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Profissão</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {Object.keys(CRAFTING_DB).map(p => (
                      <button key={p} onClick={() => setCraftProfTab(p)}
                        style={{ background: craftProfTab === p ? `linear-gradient(135deg, ${gold}, #8a6a20)` : BG_CARD, border: `1px solid ${craftProfTab === p ? gold : "rgba(196,160,80,0.2)"}`, borderRadius: 6, color: craftProfTab === p ? "#000" : TEXT_DIM, padding: "5px 12px", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: 10, fontWeight: craftProfTab === p ? "bold" : "normal", textAlign: "left", whiteSpace: "nowrap" }}>
                        {PROF_ICONS[p]} {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RANKINGS */}
              {comDados.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ color: green, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>🏆 Maior Margem Líquida</div>
                    {topMargem.map((i, idx) => (
                      <div key={i.nome} style={{ marginBottom: 8 }}>
                        <div style={{ color: idx === 0 ? green : TEXT_DIM, fontSize: 11, fontWeight: idx === 0 ? "bold" : "normal" }}>#{idx+1} {i.nome}</div>
                        <div style={{ color: pc(i.margem), fontSize: 13, fontWeight: "bold" }}>{i.margem >= 0 ? "+" : ""}{fmtInt(i.margem)} silver</div>
                        <div style={{ color: TEXT_DIM, fontSize: 10 }}>por craft ({i.qty}un)</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ color: blue, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>📈 Maior Margem %</div>
                    {topPct.map((i, idx) => (
                      <div key={i.nome} style={{ marginBottom: 8 }}>
                        <div style={{ color: idx === 0 ? blue : TEXT_DIM, fontSize: 11, fontWeight: idx === 0 ? "bold" : "normal" }}>#{idx+1} {i.nome}</div>
                        <div style={{ color: pc(i.margemPct), fontSize: 13, fontWeight: "bold" }}>{i.margemPct >= 0 ? "+" : ""}{fmt(i.margemPct, 1)}%</div>
                        <div style={{ color: TEXT_DIM, fontSize: 10 }}>sobre custo total</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ color: purple, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>⚡ Melhor por EXP</div>
                    {topEXP.map((i, idx) => (
                      <div key={i.nome} style={{ marginBottom: 8 }}>
                        <div style={{ color: idx === 0 ? purple : TEXT_DIM, fontSize: 11, fontWeight: idx === 0 ? "bold" : "normal" }}>#{idx+1} {i.nome}</div>
                        <div style={{ color: idx === 0 ? purple : TEXT_DIM, fontSize: 13, fontWeight: "bold" }}>{fmt(i.margemEXP, 2)} silver/EXP</div>
                        <div style={{ color: TEXT_DIM, fontSize: 10 }}>{i.exp} EXP por craft</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PREÇOS DE MATERIAIS */}
              <Divider label={`${PROF_ICONS[craftProfTab]} Preços de materiais — ${craftProfTab}`} />
              <div style={{ background: BG_CARD, border: "1px solid rgba(96,165,250,0.1)", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 14, lineHeight: 1.7 }}>
                  💡 Insira o preço de mercado de cada material. Os valores são aplicados automaticamente a todas as receitas que usam esse material.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                  {matsUnicos.map(mat => (
                    <div key={mat} style={{ display: "flex", alignItems: "center", gap: 8, background: BG_SURFACE, border: `1px solid ${getMatPreco(mat) > 0 ? "rgba(196,160,80,0.25)" : "rgba(255,255,255,0.05)"}`, borderRadius: 7, padding: "7px 10px" }}>
                      <div style={{ flex: 1, fontSize: 11, color: getMatPreco(mat) > 0 ? TEXT_PRIM : TEXT_DIM, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={mat}>{mat}</div>
                      <NumInput value={getMatPreco(mat)} onChange={v => setMatPreco(mat, v)} min={0}
                        style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 4, color: gold, padding: "4px 8px", fontSize: 11, width: 80, fontFamily: "'Space Mono',monospace", outline: "none", textAlign: "right" }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* TABELA DE RECEITAS */}
              <Divider label="Receitas e margens calculadas" />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr>
                      {["Nv", "Item", "Qtd", "Custo Mat.", `Tax (+${extraTaxPct}%)`, "Custo Total", "Preço Venda (un)", "Receita", "Margem", "Margem %", "Silver/EXP", "Crafts → OS", "Profit até OS", "Crafts → MAX", "Profit até MAX"].map(h => (
                        <th key={h} style={{ color: gold, padding: "8px 8px", textAlign: "center", fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(196,160,80,0.2)", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calc.map((item) => {
                      const isBest = topMargem[0]?.nome === item.nome;
                      return (
                        <tr key={item.nome} style={{ background: isBest ? "rgba(74,222,128,0.05)" : "transparent" }}>
                          <td style={{ padding: "7px 8px", textAlign: "center", color: TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{item.nivel}</td>
                          <td style={{ padding: "7px 8px", color: isBest ? green : TEXT_PRIM, fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.nome}
                            <div style={{ fontSize: 9, color: TEXT_DIM, fontWeight: "normal", marginTop: 2 }}>
                              {item.materiais.map(m => `${m.qtd}× ${m.nome}`).join(" · ")}
                            </div>
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "center", color: TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{item.qty}x</td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.custoMateriais > 0 ? TEXT_PRIM : TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.custoMateriais > 0 ? fmtInt(item.custoMateriais) : "—"}
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: extraTaxPct > 0 ? red : TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {fmtInt(item.taxReal)} <span style={{ fontSize: 9, color: TEXT_DIM }}>(+{fmtInt(item.taxReal - item.baseTax)})</span>
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.custoMateriais > 0 ? orange : TEXT_DIM, fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.custoMateriais > 0 ? fmtInt(item.custoTotal) : "—"}
                          </td>
                          <td style={{ padding: "6px 8px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <NumInput value={item.precoVenda} onChange={v => setCraftPrice(item.nome, v)} min={0}
                              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 4, color: gold, padding: "4px 8px", fontSize: 11, width: 90, fontFamily: "'Space Mono',monospace", outline: "none", textAlign: "right" }} />
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.temDados ? TEXT_PRIM : TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.temDados ? fmtInt(item.receitaTotal) : "—"}
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.margem !== null ? pc(item.margem) : TEXT_DIM, fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.margem !== null ? `${item.margem >= 0 ? "+" : ""}${fmtInt(item.margem)}` : "—"}
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.margemPct !== null ? pc(item.margemPct) : TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.margemPct !== null ? `${item.margemPct >= 0 ? "+" : ""}${fmt(item.margemPct, 1)}%` : "—"}
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: item.margemEXP !== null ? (item.margemEXP > 0 ? purple : red) : TEXT_DIM, borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {item.margemEXP !== null ? fmt(item.margemEXP, 2) : "—"}
                          </td>

                          {/* Crafts → Oversupply (100%) */}
                          <td style={{ padding: "7px 8px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {craftOversupply >= 100
                              ? <span style={{ color: red, fontSize: 10 }}>já em OS</span>
                              : item.craftsParaOS !== null
                                ? <span style={{ color: orange, fontWeight: "bold" }}>{fmtInt(item.craftsParaOS)}</span>
                                : <span style={{ color: TEXT_DIM }}>—</span>}
                          </td>

                          {/* Profit total até OS */}
                          <td style={{ padding: "7px 8px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {craftOversupply >= 100
                              ? <span style={{ color: TEXT_DIM }}>—</span>
                              : item.profitAteOS !== null
                                ? <span style={{ color: pc(item.profitAteOS), fontWeight: "bold" }}>{item.profitAteOS >= 0 ? "+" : ""}{fmtInt(item.profitAteOS)}</span>
                                : <span style={{ color: TEXT_DIM }}>—</span>}
                          </td>

                          {/* Crafts → MAX (500%) */}
                          <td style={{ padding: "7px 8px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {craftOversupply >= 500
                              ? <span style={{ color: red, fontSize: 10 }}>MAX</span>
                              : item.craftsParaMax !== null
                                ? <span style={{ color: TEXT_DIM }}>{fmtInt(item.craftsParaMax)}</span>
                                : <span style={{ color: TEXT_DIM }}>—</span>}
                          </td>

                          {/* Profit total até MAX */}
                          <td style={{ padding: "7px 8px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.03)", whiteSpace: "nowrap" }}>
                            {craftOversupply >= 500
                              ? <span style={{ color: TEXT_DIM }}>—</span>
                              : item.profitAteMax !== null
                                ? <span style={{ color: pc(item.profitAteMax) }}>{item.profitAteMax >= 0 ? "+" : ""}{fmtInt(item.profitAteMax)}</span>
                                : <span style={{ color: TEXT_DIM }}>—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 12, lineHeight: 1.7 }}>
                💡 <strong style={{ color: TEXT_PRIM }}>Custo Mat.</strong> = soma de (qtd × preço) de cada material · <strong style={{ color: TEXT_PRIM }}>Tax</strong> = tax base ajustada pelo oversupply atual · <strong style={{ color: TEXT_PRIM }}>Crafts → OS</strong> = quantos crafts até atingir 100% de oversupply a partir do nível atual · Rankings só aparecem quando preço de venda e materiais estão preenchidos.
              </div>
            </Section>
          </div>
        );
      })()}

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

      {/* TAB: INFUSION */}
      {tab === "infusion" && (
        <div>
          {/* Target EXP */}
          <Section title="✨ Calculadora de Infusion" icon="⚗️" accent>
            <div style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
              💡 Insira o <strong style={{ color: purple }}>preço de mercado</strong> de cada Infusion e o <strong style={{ color: gold }}>EXP que você precisa ganhar</strong>. A calculadora mostra qual comprar e quanto vai custar.
            </div>

            {/* Target EXP */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <label style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>EXP necessário:</label>
              <NumInput value={infusionTargetEXP} onChange={v => setInfusionTargetEXP(v)} min={0}
                style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${gold}55`, borderRadius: 6, color: gold, padding: "8px 14px", fontSize: 16, width: 160, fontFamily: "'Space Mono', monospace", outline: "none", fontWeight: "bold" }} />
              <span style={{ color: "#404050", fontSize: 10 }}>EXP para infundir no item</span>
            </div>

            {/* Melhor opção destaque */}
            {melhorInfusion && (
              <div style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02))", border: "1px solid rgba(74,222,128,0.35)", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: green, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>✅ Melhor custo-benefício atual</div>
                  <div style={{ color: "#f0e6c8", fontSize: 18, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{melhorInfusion.nome}</div>
                  <div style={{ color: dim, fontSize: 11, marginTop: 4 }}>{melhorInfusion.exp} EXP/un · {fmtInt(melhorInfusion.preco)} silver/un</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>Para {fmtInt(infusionTargetEXP)} EXP</div>
                  <div style={{ color: green, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(melhorInfusion.custoTotal)}</div>
                  <div style={{ color: dim, fontSize: 10 }}>{fmtInt(melhorInfusion.qtdNecessaria)} unidades</div>
                </div>
              </div>
            )}

            {/* Tabela Terra */}
            <Divider label="⚔️ Infusions de Terra" />
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 20 }}>
              <thead>
                <tr>
                  {["#", "Infusion", "EXP/un", "Preço Mkt", "Silver/EXP", `Qtd p/ ${fmtInt(infusionTargetEXP)} EXP`, "Custo Total"].map(h => (
                    <th key={h} style={{ color: gold, padding: "8px 10px", textAlign: "center", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(196,160,80,0.2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {infusionRanking.filter(i => i.tipo === "terra").map((inf, rankIdx) => {
                  const rank = infusionRanking.findIndex(r => r.nome === inf.nome);
                  const isBest = rank === 0 && inf.preco > 0;
                  const rowColor = isBest ? "rgba(74,222,128,0.06)" : "transparent";
                  return (
                    <tr key={inf.nome} style={{ background: rowColor }}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? `#${rank + 1}` : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", color: isBest ? green : "#c0c0d0", fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.nome}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: purple, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.exp}</td>
                      <td style={{ padding: "6px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={inf.preco} onChange={v => setInfusionPreco(inf.nome, v)} min={0}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.35)", borderRadius: 4, color: orange, padding: "4px 8px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "center" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : (inf.preco > 0 ? "#f0e6c8" : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmt(inf.silverPerExp, 1) : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: inf.preco > 0 ? "#f0e6c8" : "#404050", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmtInt(inf.qtdNecessaria) : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : (inf.preco > 0 ? orange : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmtInt(inf.custoTotal) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Tabela Mar */}
            <Divider label="🌊 Infusions de Mar" />
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {["#", "Infusion", "EXP/un", "Preço Mkt", "Silver/EXP", `Qtd p/ ${fmtInt(infusionTargetEXP)} EXP`, "Custo Total"].map(h => (
                    <th key={h} style={{ color: blue, padding: "8px 10px", textAlign: "center", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(96,165,250,0.2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {infusionRanking.filter(i => i.tipo === "mar").map((inf) => {
                  const rank = infusionRanking.findIndex(r => r.nome === inf.nome);
                  const isBest = rank === 0 && inf.preco > 0;
                  return (
                    <tr key={inf.nome} style={{ background: isBest ? "rgba(74,222,128,0.06)" : "transparent" }}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? `#${rank + 1}` : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", color: isBest ? green : "#c0c0d0", fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.nome}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: blue, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.exp}</td>
                      <td style={{ padding: "6px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={inf.preco} onChange={v => setInfusionPreco(inf.nome, v)} min={0}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(96,165,250,0.35)", borderRadius: 4, color: blue, padding: "4px 8px", fontSize: 12, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "center" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : (inf.preco > 0 ? "#f0e6c8" : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmt(inf.silverPerExp, 1) : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: inf.preco > 0 ? "#f0e6c8" : "#404050", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmtInt(inf.qtdNecessaria) : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : (inf.preco > 0 ? blue : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {inf.preco > 0 ? fmtInt(inf.custoTotal) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Section>

          {/* MELHOR PARA CAÇAR */}
          <Section title="🏹 Melhor para Caçar" icon="⚔️" borderColor="rgba(248,113,113,0.3)">
            <div style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
              📌 Insira a <strong style={{ color: red }}>quantidade dropada por hora</strong> para cada infusion. O ranking mostra qual gera mais silver/hora ao caçar.
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
              <thead>
                <tr>{["#", "Infusion", "Tipo", "Preço Mkt", "Qtd / hora", "Silver / hora", "USD / hora"].map(h => (
                  <th key={h} style={{ color: red, padding: "8px 10px", textAlign: "center", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(248,113,113,0.2)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {INFUSIONS.map(inf => {
                  const qtd = infusionQtdHora[inf.nome] || 0;
                  const preco = infusionPrecos[inf.nome] || 0;
                  const silverH = qtd * preco;
                  const rank = huntDropRanking.findIndex(r => r.nome === inf.nome);
                  const isBest = rank === 0 && silverH > 0;
                  return (
                    <tr key={inf.nome} style={{ background: isBest ? "rgba(248,113,113,0.06)" : "transparent" }}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? red : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{silverH > 0 ? `#${rank + 1}` : "—"}</td>
                      <td style={{ padding: "8px 10px", color: isBest ? red : "#c0c0d0", fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.nome}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: inf.tipo === "mar" ? blue : gold, fontSize: 10, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.tipo === "mar" ? "🌊 Mar" : "⚔️ Terra"}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: preco > 0 ? orange : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{preco > 0 ? fmtInt(preco) : "—"}</td>
                      <td style={{ padding: "4px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={qtd} onChange={v => setInfusionQtd(inf.nome, v)} min={0}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 4, color: red, padding: "4px 8px", fontSize: 12, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "center" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? red : (silverH > 0 ? "#f0e6c8" : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{silverH > 0 ? fmtInt(silverH) : "—"}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: silverH > 0 ? dim : "#404050", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{silverH > 0 ? fmtUSD(toUSD(silverH)) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {huntDropRanking.length > 0 && (
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: red, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>🏆 Melhor para caçar</div>
                  <div style={{ color: "#f0e6c8", fontSize: 16, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{huntDropRanking[0].nome}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: red, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(huntDropRanking[0].silverHora)}<span style={{ fontSize: 11 }}> silver/h</span></div>
                  <div style={{ color: dim, fontSize: 11 }}>{fmtUSD(toUSD(huntDropRanking[0].silverHora * 24 * 30))}/mês</div>
                </div>
              </div>
            )}
          </Section>

          {/* MELHOR PARA REVENDER */}
          <Section title="💸 Melhor para Revender (Flip)" icon="📈" borderColor="rgba(74,222,128,0.3)">
            <div style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 11, color: dim, lineHeight: 1.7 }}>
              📌 Insira o <strong style={{ color: blue }}>preço de compra</strong> (oferta mais barata no mkt) e o <strong style={{ color: orange }}>preço de venda</strong> (campo Preço Mkt na tabela acima). O ranking mostra qual tem maior margem.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <label style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Taxa do mercado:</label>
              <NumInput value={taxaMkt} onChange={v => setTaxaMkt(v)} min={0} max={100}
                style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 6, color: green, padding: "6px 12px", fontSize: 14, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", fontWeight: "bold" }} />
              <span style={{ color: green, fontSize: 13 }}>%</span>
              <span style={{ color: "#404050", fontSize: 10 }}>desconto do marketplace na venda</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
              <thead>
                <tr>{["#", "Infusion", "Comprar por", "Vender por", "Lucro / un", "Margem %"].map(h => (
                  <th key={h} style={{ color: green, padding: "8px 10px", textAlign: "center", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(74,222,128,0.2)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {INFUSIONS.map(inf => {
                  const venda = infusionPrecos[inf.nome] || 0;
                  const compra = infusionCompra[inf.nome] || 0;
                  const lucro = venda > 0 && compra > 0 ? venda * (1 - taxaMkt / 100) - compra : 0;
                  const margem = compra > 0 && lucro > 0 ? (lucro / compra) * 100 : 0;
                  const rank = flipRanking.findIndex(r => r.nome === inf.nome);
                  const isBest = rank === 0 && lucro > 0;
                  return (
                    <tr key={inf.nome} style={{ background: isBest ? "rgba(74,222,128,0.06)" : "transparent" }}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: isBest ? green : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{lucro > 0 ? `#${rank + 1}` : "—"}</td>
                      <td style={{ padding: "8px 10px", color: isBest ? green : "#c0c0d0", fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{inf.nome}</td>
                      <td style={{ padding: "4px 10px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <NumInput value={compra} onChange={v => setInfusionBuy(inf.nome, v)} min={0}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 4, color: blue, padding: "4px 8px", fontSize: 12, width: 100, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "center" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: venda > 0 ? orange : "#404050", fontSize: 11, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{venda > 0 ? fmtInt(venda) : "—"}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: lucro > 0 ? green : (lucro < 0 ? red : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {compra > 0 && venda > 0 ? (lucro > 0 ? "+" : "") + fmtInt(lucro) : "—"}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: margem > 0 ? green : (lucro < 0 ? red : "#404050"), fontWeight: isBest ? "bold" : "normal", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        {margem > 0 ? `+${fmt(margem, 1)}%` : (lucro < 0 ? `${fmt((lucro / compra) * 100, 1)}%` : "—")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {flipRanking.length > 0 && (
              <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: green, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>🏆 Melhor para revender</div>
                  <div style={{ color: "#f0e6c8", fontSize: 16, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{flipRanking[0].nome}</div>
                  <div style={{ color: dim, fontSize: 11, marginTop: 2 }}>compra: {fmtInt(flipRanking[0].compra)} · venda: {fmtInt(flipRanking[0].venda)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: green, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>+{fmtInt(flipRanking[0].lucroUnit)}<span style={{ fontSize: 11 }}>/un</span></div>
                  <div style={{ color: green, fontSize: 14 }}>+{fmt(flipRanking[0].margemPct, 1)}% margem</div>
                </div>
              </div>
            )}
          </Section>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(96,165,250,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(96,165,250,0.15))" }} />
          <span style={{ color: "rgba(96,165,250,0.2)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>ToilZero · RavenLab · RavenQuest Economy Intelligence</span>
          <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(96,165,250,0.15))" }} />
        </div>
      </div>
    </div>
  );
}
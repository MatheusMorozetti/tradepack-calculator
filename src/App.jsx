import { useState, useMemo } from "react";

// ============================================================
// SENHA DE ACESSO — altere aqui para trocar a senha
const SENHA_CORRETA = "ravenquest2026";
// ============================================================

function LoginScreen({ onLogin }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [tentativas, setTentativas] = useState(0);

  const handleSubmit = () => {
    if (senha === SENHA_CORRETA) {
      onLogin();
    } else {
      setErro(true);
      setTentativas(t => t + 1);
      setSenha("");
      setTimeout(() => setErro(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#080810",
      backgroundImage: "radial-gradient(ellipse at 50% 40%, rgba(196,160,80,0.08) 0%, transparent 60%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Mono', monospace",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(196,160,80,0.3)",
        borderRadius: 16, padding: "40px 48px", textAlign: "center", width: 360,
      }}>
        <div style={{ fontSize: 10, color: "#c4a050", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
          ⚔ RavenQuest · Merchant Ledger ⚔
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#f0e6c8", marginBottom: 4 }}>
          Tradepack Prime
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#c4a050", marginBottom: 32 }}>
          Calculator
        </div>

        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Digite a senha de acesso"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              width: "100%", background: erro ? "rgba(248,113,113,0.08)" : "rgba(0,0,0,0.4)",
              border: `1px solid ${erro ? "rgba(248,113,113,0.6)" : "rgba(196,160,80,0.3)"}`,
              borderRadius: 8, color: "#f0e6c8", padding: "12px 16px", fontSize: 14,
              fontFamily: "'Space Mono', monospace", outline: "none",
              boxSizing: "border-box", transition: "border 0.2s",
            }}
          />
        </div>

        {erro && (
          <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12, letterSpacing: "0.05em" }}>
            ❌ Senha incorreta{tentativas >= 3 ? ` (${tentativas} tentativas)` : ""}
          </div>
        )}

        <button onClick={handleSubmit} style={{
          width: "100%", background: "linear-gradient(135deg, #c4a050, #8a6a20)",
          border: "none", borderRadius: 8, color: "#000", padding: "12px",
          cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 13,
          fontWeight: "bold", letterSpacing: "0.08em",
        }}>
          ENTRAR →
        </button>

        <div style={{ color: "#303040", fontSize: 10, marginTop: 24 }}>
          ToilZero Calculator · Acesso restrito
        </div>
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
  "Pickled Vegetables": {
    materiais: [
      { nome: "Cabbage", qtd: 238, custoProducao: 72, precoMkt: 2100 },
      { nome: "Carrot", qtd: 300, custoProducao: 83, precoMkt: 2000 },
      { nome: "Salt", qtd: 12, custoProducao: 0, precoMkt: 4900 },
    ]
  },
  "Cavedweller Findings": {
    materiais: [
      { nome: "Cobalt Ore", qtd: 110, custoProducao: 0, precoMkt: 16000 },
      { nome: "Stone", qtd: 148, custoProducao: 0, precoMkt: 885 },
      { nome: "Glowing Spores", qtd: 120, custoProducao: 82, precoMkt: 2440 },
      { nome: "Thorny Roots", qtd: 120, custoProducao: 85, precoMkt: 85 },
    ]
  },
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

function Toggle({ label, value, onChange, sub, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, background: accent && value ? "rgba(196,160,80,0.06)" : "transparent", borderRadius: 8, padding: accent ? "8px 12px" : 0 }}>
      <div>
        <span style={{ color: accent && value ? gold : dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
        {sub && <div style={{ color: "#505060", fontSize: 10, marginTop: 2 }}>{sub}</div>}
      </div>
      <button onClick={() => onChange(!value)} style={{ background: value ? `linear-gradient(135deg, ${gold}, #8a6a20)` : "rgba(0,0,0,0.4)", border: `1px solid ${value ? gold : "rgba(196,160,80,0.3)"}`, borderRadius: 20, width: 52, height: 26, cursor: "pointer", position: "relative", transition: "all 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: value ? 28 : 3, width: 18, height: 18, borderRadius: "50%", background: value ? "#fff" : "#666", transition: "all 0.2s" }} />
      </button>
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

function Tag({ text, color }) {
  return <span style={{ background: `${color}22`, border: `1px solid ${color}55`, borderRadius: 4, padding: "2px 7px", fontSize: 10, color, fontFamily: "'Space Mono', monospace", marginRight: 4 }}>{text}</span>;
}

export default function App() {
  const [tab, setTab] = useState("tradepack");

  // MERCADO
  const [poolRate, setPoolRate] = useState(0.0000264);
  const [questUSD, setQuestUSD] = useState(0.0042);
  const [questToSilver, setQuestToSilver] = useState(50650);

  // CALIBRAÇÃO
  const [calIM, setCalIM] = useState(14621610);
  const [calQUEST, setCalQUEST] = useState(386);
  const [calJoias, setCalJoias] = useState(664);
  const [calIMpacks, setCalIMpacks] = useState(10308690);
  const calPoolRate = calIM > 0 ? calQUEST / calIM : 0;
  const calIMjoia = calJoias > 0 ? (calIM - calIMpacks) / calJoias : 0;

  // EXPEDIÇÃO
  const [imExpSemana, setImExpSemana] = useState(4312920);
  const [joiasTotal, setJoiasTotal] = useState(664);

  // TRADEPACK
  const [packSelecionado, setPackSelecionado] = useState("Cavedweller Findings");
  const [qtdPacks, setQtdPacks] = useState(10);
  const [diasSemana, setDiasSemana] = useState(7);
  const [silverPorPack, setSilverPorPack] = useState(95000);
  const [imPorPack, setImPorPack] = useState(1030869);
  const [qtdEnhanced, setQtdEnhanced] = useState(0);  // packs com Enhanced (×2 IM)
  const [qtdPlunder, setQtdPlunder] = useState(0);    // packs no Plunder (+15%)
  const [custoCert, setCustoCert] = useState(1.2);

  // BÔNUS
  const [barteringI] = useState(true);
  const [barteringII] = useState(true);

  // ATIVIDADES COMPARATIVAS
  const [silverHoraCaca, setSilverHoraCaca] = useState(4830102);
  const [silverHoraMineracao, setSilverHoraMineracao] = useState(4516250);
  const [horasPorSemana, setHorasPorSemana] = useState(10);

  // MATERIAIS EDITÁVEIS
  const packAtual = PACKS[packSelecionado];
  const [matsOverride, setMatsOverride] = useState({});

  const getMat = (nome, campo) => {
    if (matsOverride[nome] && matsOverride[nome][campo] !== undefined) return matsOverride[nome][campo];
    return packAtual.materiais.find(m => m.nome === nome)?.[campo] ?? 0;
  };
  const setMat = (nome, campo, val) => setMatsOverride(prev => ({ ...prev, [nome]: { ...(prev[nome] || {}), [campo]: val } }));

  const r = useMemo(() => {
    const bonusBartering = 1 + (barteringI ? 0.05 : 0) + (barteringII ? 0.10 : 0);
    const packsSemanais = qtdPacks;

    // Quantidades validadas (não pode ultrapassar total de packs)
    const enhancedVal = Math.min(qtdEnhanced, packsSemanais);
    const plunderVal = Math.min(qtdPlunder, packsSemanais);
    const packsNormais = packsSemanais - enhancedVal;

    // IM por categoria de pack
    const imNormal = imPorPack * bonusBartering;
    const imEnhanced = imPorPack * 2 * bonusBartering;
    const imPlunderBonus = imPorPack * bonusBartering * 0.15; // bônus extra dos packs no plunder

    // IM total semana
    const imNormalTotal = packsNormais * imNormal;
    const imEnhancedTotal = enhancedVal * imEnhanced;
    const imPlunderTotal = plunderVal * imPlunderBonus; // bônus adicional do plunder
    const imTotal_semana = imNormalTotal + imEnhancedTotal + imPlunderTotal;

    // IM efetiva média por pack (para exibição)
    const imEfetiva = packsSemanais > 0 ? imTotal_semana / packsSemanais : imPorPack * bonusBartering;

    // Custos do pack
    const mats = packAtual.materiais;
    const custoProducaoTotal = mats.reduce((acc, m) => acc + m.qtd * getMat(m.nome, "custoProducao"), 0);
    const valorMktTotal = mats.reduce((acc, m) => acc + m.qtd * getMat(m.nome, "precoMkt"), 0);
    const certCusto_Q = 10 * custoCert;
    const certCusto_S = certCusto_Q * questToSilver;

    // Receita do pack
    const silverLiqPorPack = silverPorPack - custoProducaoTotal;
    const imTotal_semana = imEfetiva * packsSemanais;
    const questIM = imTotal_semana * poolRate;
    const questCerts = packsSemanais * certCusto_Q;
    const questLiq = questIM - questCerts;

    // Custo oportunidade (vender materiais)
    const lucroVendaMkt = valorMktTotal - custoProducaoTotal;
    const questVendaMkt = lucroVendaMkt / questToSilver;
    const questPack = (silverLiqPorPack / questToSilver) - certCusto_Q + (imEfetiva * poolRate);
    const deltaQUEST = questPack - questVendaMkt;

    // Break-even IM/pack
    const questNecessarioPorPack = (lucroVendaMkt / questToSilver) + certCusto_Q - (silverLiqPorPack / questToSilver);
    const imBreakeven = poolRate > 0 ? questNecessarioPorPack / poolRate : 0;
    const imBreaakevenEnhanced = poolRate > 0 ? questNecessarioPorPack / (poolRate * 2) : 0;

    // Expedição
    const expIM = imExpSemana;
    const expQUEST = expIM * poolRate;
    const expUSD_mes = expQUEST * questUSD * 4.3;

    // Totais semana
    const totalIM = expIM + imTotal_semana;
    const totalQUEST_liq = expQUEST + questLiq + (packsSemanais * silverLiqPorPack / questToSilver);
    const totalUSD_sem = totalQUEST_liq * questUSD;
    const totalUSD_mes = totalUSD_sem * 4.3;

    // Atividades comparativas (semanal)
    const silverCaca_sem = silverHoraCaca * horasPorSemana;
    const silverMin_sem = silverHoraMineracao * horasPorSemana;
    const usdCaca_mes = (silverCaca_sem / questToSilver) * questUSD * 4.3;
    const usdMin_mes = (silverMin_sem / questToSilver) * questUSD * 4.3;

    // Pack vs venda mkt (semanal)
    const lucroFazerPacks = (packsSemanais * silverLiqPorPack) + questLiq * questUSD * questToSilver;
    const lucroVenderMkt_total = packsSemanais * lucroVendaMkt;

    // Profit real (o que você realmente recebe fazendo os packs)
    const profitRealUSD_mes = totalUSD_mes;

    // Profit alternativo (se vendesse os materiais ao invés de fazer os packs)
    const expUSD_mes_only = expQUEST * questUSD * 4.3;
    const vendaMktUSD_mes = (packsSemanais * lucroVendaMkt / questToSilver) * questUSD * 4.3;
    const profitAlternativoUSD_mes = expUSD_mes_only + vendaMktUSD_mes;

    // Diferença entre as duas estratégias
    const diferencaEstrategia = profitRealUSD_mes - profitAlternativoUSD_mes;

    return {
      bonusBartering, imEfetiva,
      packsSemanais, enhancedVal, plunderVal, packsNormais,
      imNormalTotal, imEnhancedTotal, imPlunderTotal,
      custoProducaoTotal, valorMktTotal, certCusto_Q, certCusto_S,
      silverLiqPorPack, imTotal_semana, questIM, questCerts, questLiq,
      lucroVendaMkt, questVendaMkt, questPack, deltaQUEST,
      imBreakeven, imBreaakevenEnhanced,
      expIM, expQUEST, expUSD_mes,
      totalIM, totalQUEST_liq, totalUSD_sem, totalUSD_mes,
      silverCaca_sem, silverMin_sem, usdCaca_mes, usdMin_mes,
      lucroFazerPacks, lucroVenderMkt_total,
      questNecessarioPorPack,
      profitRealUSD_mes, profitAlternativoUSD_mes, diferencaEstrategia,
      expUSD_mes_only, vendaMktUSD_mes,
    };
  }, [poolRate, questUSD, questToSilver, imExpSemana, joiasTotal,
    packSelecionado, qtdPacks, silverPorPack, imPorPack,
    qtdEnhanced, qtdPlunder, custoCert, matsOverride,
    silverHoraCaca, silverHoraMineracao, horasPorSemana]);

  const tabs = [
    { id: "tradepack", label: "📦 Tradepack" },
    { id: "comparativo", label: "⚔️ Comparativo" },
    { id: "mercado", label: "💰 Materiais" },
    { id: "calibracao", label: "📐 Calibração" },
  ];

  const [autenticado, setAutenticado] = useState(false);
  if (!autenticado) return <LoginScreen onLogin={() => setAutenticado(true)} />;

  return (
    <div style={{ minHeight: "100vh", background: "#080810", backgroundImage: "radial-gradient(ellipse at 15% 15%, rgba(196,160,80,0.07) 0%, transparent 55%)", fontFamily: "'Space Mono', monospace", color: "#f0e6c8", padding: "20px 16px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: gold, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>⚔ RavenQuest · Merchant Ledger ⚔</div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 700, color: "#f0e6c8", margin: 0 }}>Tradepack Prime</h1>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 700, color: gold, margin: "0 0 8px" }}>Calculator v5</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          <Tag text="dados reais" color={green} />
          <Tag text="break-even IM" color={green} />
          <Tag text="comparativo atividades" color={blue} />
          <Tag text="Bartering I+II" color={gold} />
          <Tag text="patch 1.0.7.1" color={purple} />
        </div>
      </div>

      {/* RESULTADO PRINCIPAL */}
      <div style={{ background: "linear-gradient(135deg, rgba(196,160,80,0.10), rgba(196,160,80,0.02))", border: "1px solid rgba(196,160,80,0.4)", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: gold, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: 14 }}>💰 Comparativo de Estratégias — Mensal</div>

        {/* 3 cenários */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {/* Cenário 1: Fazendo os packs */}
          <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📦 Fazendo os Packs Prime</div>
            <div style={{ color: green, fontSize: 30, fontFamily: "'Cinzel', serif", fontWeight: 700, lineHeight: 1 }}>
              +{fmtUSD(r.profitRealUSD_mes)}
            </div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              Expedição + silver + QUEST<br/>
              Você realmente recebe isso ✅
            </div>
          </div>

          {/* Cenário 2: Vendendo materiais */}
          <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💰 Vendendo os Materiais</div>
            <div style={{ color: orange, fontSize: 30, fontFamily: "'Cinzel', serif", fontWeight: 700, lineHeight: 1 }}>
              +{fmtUSD(r.profitAlternativoUSD_mes)}
            </div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              Expedição + venda no mkt<br/>
              Sem custo de certificados ✅
            </div>
          </div>

          {/* Diferença */}
          <div style={{ background: r.diferencaEstrategia >= 0 ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${r.diferencaEstrategia >= 0 ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
            <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📊 Diferença de Estratégia</div>
            <div style={{ color: pc(r.diferencaEstrategia), fontSize: 30, fontFamily: "'Cinzel', serif", fontWeight: 700, lineHeight: 1 }}>
              {r.diferencaEstrategia >= 0 ? "+" : ""}{fmtUSD(r.diferencaEstrategia)}
            </div>
            <div style={{ color: "#505060", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              {r.diferencaEstrategia >= 0 ? "Pack compensa ✅" : "Vender mat. é melhor ❌"}<br/>
              {r.diferencaEstrategia < 0 ? `Deixa ${fmtUSD(Math.abs(r.diferencaEstrategia))}/mês na mesa` : `Ganho extra fazendo pack`}
            </div>
          </div>
        </div>

        {/* Stats secundários */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <Stat label="Expedição/mês" value={`+${fmtUSD(r.expUSD_mes)}`} sub={`${fmtInt(joiasTotal)} 💎 · ${fmtInt(imExpSemana)} IM`} color={blue} />
          <Stat label="IM Packs/sem" value={fmtInt(r.imTotal_semana)} sub={`${r.packsSemanais} packs`} color={gold} />
          <Stat label="QUEST IM líq." value={fmt(r.questLiq)} sub={`-${fmt(r.questCerts)} Q certs`} color={pc(r.questLiq)} />
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
              {/* Seletor de pack */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5 }}>Pack Selecionado</label>
                <select value={packSelecionado} onChange={e => { setPackSelecionado(e.target.value); setMatsOverride({}); }}
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: gold, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }}>
                  {Object.keys(PACKS).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Packs por semana" value={qtdPacks} onChange={setQtdPacks} step={1} />
                <Field label="Silver/pack entregue" value={silverPorPack} onChange={setSilverPorPack} step={1000} suffix="silver" hint="Varia por demanda/rota" />
                <Field label="IM base/pack" value={imPorPack} onChange={setImPorPack} step={10000} suffix="IM" hint="Real medido: 1.030.869" />
                <Field label="Custo certificado" value={custoCert} onChange={setCustoCert} step="0.05" suffix="QUEST" />
              </div>

              <Divider label="Packs Especiais" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="🔮 Packs com Enhanced" value={qtdEnhanced} onChange={v => setQtdEnhanced(Math.min(v, qtdPacks))} step={1} suffix="packs" hint={`×2 IM · máx ${qtdPacks} packs`} color={qtdEnhanced > 0 ? gold : undefined} />
                <Field label="⚔️ Packs no Plunder" value={qtdPlunder} onChange={v => setQtdPlunder(Math.min(v, qtdPacks))} step={1} suffix="packs" hint={`+15% IM · domingo→segunda`} color={qtdPlunder > 0 ? red : undefined} />
              </div>

              {/* Breakdown visual dos packs */}
              {(qtdEnhanced > 0 || qtdPlunder > 0) && (
                <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "12px 14px", marginTop: 4 }}>
                  <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Breakdown dos {qtdPacks} packs</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#c0c0d0" }}>📦 Packs normais</span>
                      <span style={{ color: "#c0c0d0", fontFamily: "'Space Mono', monospace" }}>{r.packsNormais} × {fmtInt(r.imEfetiva > 0 ? r.imNormalTotal / Math.max(r.packsNormais, 1) : imPorPack * r.bonusBartering)} IM = {fmtInt(r.imNormalTotal)}</span>
                    </div>
                    {qtdEnhanced > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: gold }}>🔮 Enhanced (×2)</span>
                        <span style={{ color: gold, fontFamily: "'Space Mono', monospace" }}>{r.enhancedVal} × {fmtInt(imPorPack * r.bonusBartering * 2)} IM = {fmtInt(r.imEnhancedTotal)}</span>
                      </div>
                    )}
                    {qtdPlunder > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: red }}>⚔️ Plunder (+15%)</span>
                        <span style={{ color: red, fontFamily: "'Space Mono', monospace" }}>+{fmtInt(r.imPlunderTotal)} IM bônus</span>
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: gold, fontWeight: "bold" }}>Total IM packs</span>
                      <span style={{ color: gold, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(r.imTotal_semana)}</span>
                    </div>
                  </div>
                </div>
              )}
            </Section>

            <Section title="Bônus Ativos" icon="⚡" borderColor="rgba(196,160,80,0.4)">
              <div style={{ background: "rgba(196,160,80,0.06)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: green, fontSize: 12 }}>✅ Bartering I (+5%)</span>
                  <span style={{ color: green, fontSize: 12 }}>T3 · 1.000 rep</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: green, fontSize: 12 }}>✅ Bartering II (+10%)</span>
                  <span style={{ color: green, fontSize: 12 }}>T7 · 3.000 rep</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: qtdEnhanced > 0 ? gold : dim, fontSize: 12 }}>{qtdEnhanced > 0 ? "🔮" : "⬜"} Enhanced (×2 IM)</span>
                  <span style={{ color: qtdEnhanced > 0 ? gold : dim, fontSize: 12 }}>{qtdEnhanced > 0 ? `${qtdEnhanced} packs` : "inativo"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: qtdPlunder > 0 ? red : dim, fontSize: 12 }}>{qtdPlunder > 0 ? "⚔️" : "⬜"} Plunder (+15%)</span>
                  <span style={{ color: qtdPlunder > 0 ? red : dim, fontSize: 12 }}>{qtdPlunder > 0 ? `${qtdPlunder} packs` : "inativo"}</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Stat label="Bônus Bartering" value={`+${fmt((r.bonusBartering - 1) * 100, 0)}%`} color={gold} />
                <Stat label="IM Média/Pack" value={fmtInt(r.imEfetiva)} sub="média com todos os bônus" color={gold} />
              </div>
            </Section>
          </div>

          <div>
            {/* BREAK-EVEN */}
            <Section title="Análise de Break-even" icon="⚖️" borderColor={r.deltaQUEST >= 0 ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}>
              <div style={{ background: r.deltaQUEST >= 0 ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${r.deltaQUEST >= 0 ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: 10, padding: "16px", marginBottom: 14, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Resultado vs Vender Materiais</div>
                <div style={{ color: pc(r.deltaQUEST), fontSize: 24, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>
                  {r.deltaQUEST >= 0 ? "✅ COMPENSA" : "❌ NÃO COMPENSA"}
                </div>
                <div style={{ color: pc(r.deltaQUEST), fontSize: 14, marginTop: 4 }}>
                  {r.deltaQUEST >= 0 ? "+" : ""}{fmt(r.deltaQUEST)} QUEST/pack vs vender
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <Stat label="IM necessária/pack" value={fmtInt(r.imBreakeven)} sub="sem Enhanced" color={red} />
                <Stat label="IM necessária/pack" value={fmtInt(r.imBreaakevenEnhanced)} sub="com Enhanced" color={orange} />
                <Stat label="IM atual/pack" value={fmtInt(r.imEfetiva)} sub="com bônus ativos" color={pc(r.imEfetiva - r.imBreakeven)} />
                <Stat label="Margem" value={`${r.imEfetiva >= r.imBreakeven ? "+" : ""}${fmtInt(r.imEfetiva - r.imBreakeven)}`} sub="IM acima/abaixo" color={pc(r.imEfetiva - r.imBreakeven)} />
              </div>

              <Divider label="Por pack · comparativo" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Stat label="Fazer pack (silver liq.)" value={fmtInt(r.silverLiqPorPack)} sub="pós custo produção" color={blue} />
                <Stat label="Vender materiais" value={fmtInt(r.lucroVendaMkt)} sub="pós custo produção" color={orange} />
                <Stat label="QUEST do pack/IM" value={fmt(r.imEfetiva * poolRate)} sub="por pack" color={purple} />
                <Stat label="Custo cert" value={`-${fmt(r.certCusto_Q)} Q`} sub={`-${fmtInt(r.certCusto_S)} silver`} color={red} warn />
              </div>
            </Section>

            <Section title="Expedição" icon="⚔️">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="💎 Joias Acumuladas" value={joiasTotal} onChange={setJoiasTotal} step={10} suffix="joias" hint="Total acumulado (não reseta)" />
                <Field label="IM Expedição/Semana" value={imExpSemana} onChange={setImExpSemana} step={100000} suffix="IM" hint="Seu dado real: 4.312.920" color={green} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <Stat label="IM Expedição/sem" value={fmtInt(r.expIM)} />
                <Stat label="QUEST Expedição" value={`${fmt(r.expQUEST)} Q`} sub={`${fmtUSD(r.expUSD_mes)}/mês`} color={blue} />
              </div>
            </Section>

            <Section title="Mercado & Pool" icon="📊">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Pool Rate" value={poolRate} onChange={setPoolRate} step="0.0000001" hint="Real: 0,0000264" color={green} />
                <Field label="QUEST (USD)" value={questUSD} onChange={setQuestUSD} step="0.0001" suffix="USD" />
              </div>
              <Field label="QUEST → Silver" value={questToSilver} onChange={setQuestToSilver} step="100" suffix="silver" />
            </Section>
          </div>
        </div>
      )}

      {/* TAB: COMPARATIVO */}
      {tab === "comparativo" && (
        <div>
          <Section title="Comparativo de Atividades" icon="⚔️" accent>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              <Field label="Silver/hora — Caça Infusion" value={silverHoraCaca} onChange={setSilverHoraCaca} step={10000} suffix="silver" hint="Seu dado real: 4.830.102" />
              <Field label="Silver/hora — Mineração" value={silverHoraMineracao} onChange={setSilverHoraMineracao} step={10000} suffix="silver" hint="Seu dado real: 4.516.250" />
              <Field label="Horas/semana disponíveis" value={horasPorSemana} onChange={setHorasPorSemana} step={1} suffix="h" />
            </div>

            <Divider label="Resultado Semanal" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>🏹 Caça Infusion</div>
                <div style={{ color: red, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtUSD(r.usdCaca_mes)}</div>
                <div style={{ color: "#555565", fontSize: 11, marginTop: 4 }}>/mês · {fmtInt(r.silverCaca_sem)} silver/sem</div>
              </div>
              <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>⛏️ Mineração</div>
                <div style={{ color: blue, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtUSD(r.usdMin_mes)}</div>
                <div style={{ color: "#555565", fontSize: 11, marginTop: 4 }}>/mês · {fmtInt(r.silverMin_sem)} silver/sem</div>
              </div>
              <div style={{ background: "rgba(196,160,80,0.08)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📦 Tradepack Prime</div>
                <div style={{ color: gold, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtUSD(r.totalUSD_mes)}</div>
                <div style={{ color: "#555565", fontSize: 11, marginTop: 4 }}>/mês (exp + packs)</div>
              </div>
            </div>

            <Divider label="Pack vs Vender Materiais (semanal)" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: r.lucroFazerPacks >= r.lucroVenderMkt_total ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${r.lucroFazerPacks >= r.lucroVenderMkt_total ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>📦 Fazer {r.packsSemanais} packs prime</div>
                <div style={{ color: pc(r.lucroFazerPacks), fontSize: 18, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(r.packsSemanais * r.silverLiqPorPack)} silver</div>
                <div style={{ color: purple, fontSize: 12, marginTop: 4 }}>+ {fmt(r.questLiq)} QUEST ({fmtUSD(r.questLiq * questUSD)})</div>
                <div style={{ color: "#555565", fontSize: 10, marginTop: 4 }}>custo certs: -{fmt(r.questCerts)} QUEST</div>
              </div>
              <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💰 Vender materiais no mercado</div>
                <div style={{ color: orange, fontSize: 18, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>{fmtInt(r.lucroVenderMkt_total)} silver</div>
                <div style={{ color: "#555565", fontSize: 12, marginTop: 4 }}>{fmtUSD(r.lucroVenderMkt_total / questToSilver * questUSD * 4.3)}/mês</div>
                <div style={{ color: "#555565", fontSize: 10, marginTop: 4 }}>sem custo de certificados</div>
              </div>
            </div>

            <div style={{ marginTop: 14, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ color: gold, fontFamily: "'Cinzel', serif", fontSize: 12, marginBottom: 8, letterSpacing: "0.08em" }}>💡 RECOMENDAÇÃO ATUAL</div>
              <div style={{ color: dim, fontSize: 12, lineHeight: 1.8 }}>
                {r.deltaQUEST < 0
                  ? `Vender os materiais é mais lucrativo em ${fmtInt(Math.abs(r.deltaQUEST) * questToSilver)} silver/pack. O pack prime só compensa com Enhanced ativo e Bartering I+II — e mesmo assim a margem é de ~$0,04 por pack. Com Cobalt a ${fmtInt(getMat("Cobalt Ore", "precoMkt"))}/unidade, vender os materiais é a melhor estratégia enquanto o mercado estiver inflacionado.`
                  : `O pack prime compensa! Com os bônus atuais você gera +${fmt(r.deltaQUEST)} QUEST/pack a mais do que vendendo os materiais.`
                }
              </div>
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
              <select value={packSelecionado} onChange={e => { setPackSelecionado(e.target.value); setMatsOverride({}); }}
                style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.3)", borderRadius: 6, color: gold, padding: "8px 12px", fontSize: 14, width: "100%", fontFamily: "'Space Mono', monospace", outline: "none" }}>
                {Object.keys(PACKS).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 16 }}>
              <thead>
                <tr>{["Material", "Qtd", "Custo Prod./un", "Preço Mkt/un", "Custo Total", "Valor Mkt Total"].map(h => (
                  <th key={h} style={{ color: gold, padding: "8px 10px", textAlign: "right", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(196,160,80,0.2)" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {packAtual.materiais.map((m, i) => {
                  const cp = getMat(m.nome, "custoProducao");
                  const pm = getMat(m.nome, "precoMkt");
                  return (
                    <tr key={i}>
                      <td style={{ padding: "8px 10px", color: "#c0c0d0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.nome}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.qtd}</td>
                      <td style={{ padding: "4px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <input type="number" value={cp} onChange={e => setMat(m.nome, "custoProducao", parseFloat(e.target.value) || 0)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(196,160,80,0.2)", borderRadius: 4, color: "#f0e6c8", padding: "4px 8px", fontSize: 12, width: 80, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "4px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <input type="number" value={pm} onChange={e => setMat(m.nome, "precoMkt", parseFloat(e.target.value) || 0)}
                          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.3)", borderRadius: 4, color: orange, padding: "4px 8px", fontSize: 12, width: 90, fontFamily: "'Space Mono', monospace", outline: "none", textAlign: "right" }} />
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: red, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{fmtInt(m.qtd * cp)}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: orange, borderBottom: "1px solid rgba(255,255,255,0.04)", fontWeight: "bold" }}>{fmtInt(m.qtd * pm)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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
                <div style={{ color: pc(r.questPack), fontSize: 12, marginTop: 6, fontWeight: "bold" }}>
                  = {fmt(r.questPack)} QUEST total
                </div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, border: "1px solid rgba(251,146,60,0.2)" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>💰 Vender Materiais</div>
                <div style={{ color: orange, fontSize: 16, fontWeight: "bold" }}>{fmtInt(r.lucroVendaMkt)} silver</div>
                <div style={{ color: "#555565", fontSize: 12, marginTop: 4 }}>sem custo de certs</div>
                <div style={{ color: orange, fontSize: 12, marginTop: 4 }}>= {fmt(r.questVendaMkt)} QUEST equiv.</div>
                <div style={{ color: pc(r.deltaQUEST * -1), fontSize: 12, marginTop: 6, fontWeight: "bold" }}>
                  {r.deltaQUEST <= 0 ? "+" : ""}{fmt(r.deltaQUEST * -1)} QUEST a mais
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* TAB: CALIBRAÇÃO */}
      {tab === "calibracao" && (
        <div>
          <Section title="Calibração com Dados Reais" icon="📐" borderColor="rgba(74,222,128,0.4)">
            <div style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 11, color: dim, lineHeight: 1.7 }}>
              Insira seus dados reais de sexta-feira para calibrar Pool Rate e IM/Joia. Use dados do <strong style={{ color: green }}>mesmo player</strong> na mesma semana.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              <Field label="IM Total na semana" value={calIM} onChange={setCalIM} step={100000} suffix="IM" hint="Exp + Packs juntos" />
              <Field label="QUEST recebido" value={calQUEST} onChange={setCalQUEST} step={1} suffix="QUEST" hint="Chest de sexta" />
              <Field label="Joias acumuladas" value={calJoias} onChange={setCalJoias} step={10} suffix="💎" />
            </div>

            {/* IM dos packs calculada automaticamente */}
            <div style={{ background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 8, padding: "12px 16px", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: dim, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>IM gerada pelos packs (calculado automaticamente)</div>
                  <div style={{ color: "#505060", fontSize: 10 }}>{fmtInt(qtdPacks)} packs × {fmtInt(imPorPack)} IM/pack</div>
                </div>
                <div style={{ color: blue, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>
                  {fmtInt(qtdPacks * imPorPack)} IM
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 6 }}>Pool Rate calculado</div>
                <div style={{ color: green, fontSize: 18, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{calPoolRate.toFixed(8)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>{calQUEST} ÷ {fmtInt(calIM)}</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 6 }}>IM Expedição/sem</div>
                <div style={{ color: green, fontSize: 18, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{fmtInt(calIM - qtdPacks * imPorPack)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>{fmtInt(calIM)} - {fmtInt(qtdPacks * imPorPack)}</div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 6 }}>IM/Pack (automático)</div>
                <div style={{ color: blue, fontSize: 18, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>{fmtInt(imPorPack)}</div>
                <div style={{ color: "#505060", fontSize: 10, marginTop: 3 }}>configurado na aba Tradepack</div>
              </div>
            </div>

            <button onClick={() => { setPoolRate(parseFloat(calPoolRate.toFixed(9))); setImExpSemana(Math.round(calIM - qtdPacks * imPorPack)); setJoiasTotal(calJoias); }}
              style={{ width: "100%", background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.08))", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 8, color: green, padding: "11px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.06em" }}>
              ✅ Aplicar: Pool Rate {calPoolRate.toFixed(8)} · IM Exp/sem {fmtInt(calIM - qtdPacks * imPorPack)}
            </button>
          </Section>

          <Section title="Histórico de Calibrações" icon="📅">
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14, fontSize: 11, color: dim, lineHeight: 1.8 }}>
              <div style={{ color: gold, marginBottom: 8, fontFamily: "'Cinzel', serif", fontSize: 12 }}>Semana atual (dados reais)</div>
              <div>IM Total: <span style={{ color: green }}>14.621.610</span></div>
              <div>QUEST recebido: <span style={{ color: green }}>386</span></div>
              <div>Joias: <span style={{ color: green }}>664</span></div>
              <div>Pool Rate: <span style={{ color: green }}>0,0000264</span></div>
              <div>IM/Joia: <span style={{ color: green }}>6.495</span></div>
              <div>IM/Pack (10 packs): <span style={{ color: green }}>1.030.869</span></div>
              <div style={{ marginTop: 8, color: "#404050" }}>Atualize toda sexta após o pagamento para manter o modelo preciso.</div>
            </div>
          </Section>
        </div>
      )}

      <div style={{ textAlign: "center", color: "#303040", fontSize: 10, letterSpacing: "0.1em", marginTop: 10 }}>
        ToilZero Calculator v5 · dados reais · break-even · comparativo atividades · patch 1.0.7.1
      </div>
    </div>
  );
}
import React, { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "./supabase";

const TR = {
  ptBR: {
    // NAV / GERAL
    enter: "ENTRAR →",
    tools: "Ferramentas",
    plans: "Planos",
    contactMatz: "ENTRE EM CONTATO COM O MATZ",
    contactMatzArrow: "ENTRE EM CONTATO COM O MATZ →",
    backToSite: "← Voltar ao site",
    notAffiliated: "Não afiliado ao RavenQuest ou Tavernlight Games",
    tagline: "RavenQuest · Economy Intelligence",

    // HERO
    heroSub:
      "O conjunto de ferramentas econômicas mais completo para jogadores de RavenQuest. Calcule margens, oversupply, infusions e muito mais.",
    viewTools: "VER FERRAMENTAS",
    accessNow: "ACESSAR AGORA →",
    stat1: "Ferramentas",
    stat2: "Receitas de crafting",
    stat3: "Profissões",
    stat4: "Preços reais",

    // FEATURES
    featuresLabel: "Ferramentas",
    featuresTitle: "Tudo que você precisa para lucrar",
    f1t: "Tradepack Prime",
    f1d: "Calcule a margem real dos seus packs com suporte a Enhanced e Plunder. Break-even automático e comparativo de estratégias.",
    f2t: "Hunt & Mineração",
    f2d: "Projete o silver/hora da sua caçada com addons e infusions. Compare Hunt vs Mineração vs Tradepack em tempo real.",
    f3t: "Infusion Analyzer",
    f3d: "Ranking de custo por EXP, melhor infusion para caçar e cálculo de flip no mercado com taxa configurável.",
    f4t: "Crafting & Oversupply",
    f4d: "Calcule a margem real por receita usando preços do seu servidor. Saiba exatamente quantos crafts até travar o oversupply.",
    f5t: "Pool Rate Calibration",
    f5d: "Insira o QUEST recebido no chest de sexta e calibre o pool rate real do seu servidor para projeções precisas.",
    f6t: "Materiais",
    f6d: "Tabela de materiais por pack com custo de produção vs preço de mercado. Toggle de desconto QUEST por material.",

    // PRICING
    pricingLabel: "Planos",
    pricingTitle: "Pago em silver, direto no jogo",
    pricingSub: "Sem cartão. Sem cadastro externo. Você paga o silver, ganha o acesso.",
    p1n: "Guild Pass",
    p1p: "35kk",
    p1per: "silver/semana por membro",
    p1d: "Para guildas. Mínimo 10 membros. Preços de mercado sincronizados em tempo real entre todos os membros.",
    p2n: "Plano Amigos",
    p2p: "35kk",
    p2per: "silver/semana por pessoa",
    p2d: "Para grupos de amigos. Mínimo 5 pessoas. Preços do mercado atualizados automaticamente para todos do grupo.",
    p3n: "Solo Pass",
    p3p: "40kk",
    p3per: "silver/semana",
    p3d: "Para qualquer player que queira acesso individual completo.",
    popular: "Mais popular",
    p4n: "Via Streamer",
    p4p: "36kk",
    p4per: "silver/semana",
    p4d: "Use o cupom do seu streamer favorito e economize 10%.",
    pricingNote:
      "Pagamento feito diretamente em silver no jogo · Acesso liberado manualmente em até 24h · Cupons de streamer disponíveis · Valor do Guild Pass e Plano Amigos é por membro",

    // CTA FINAL
    ctaTitle: "Pronto para lucrar mais?",
    ctaDesc: "Entre em contato com o Matz para solicitar acesso. O RavenLab paga seu custo na primeira semana de uso.",

    // LOGIN
    loginAccess: "RavenQuest · Economy Intelligence",
    loginWelcome: "Bem-vindo ao",
    loginEmail: "Seu email de acesso",
    loginPass: "Senha",
    loginBtn: "ENTRAR →",
    loginLoading: "VERIFICANDO...",
    loginForgot: "Esqueci minha senha",
    loginErrEmpty: "Preencha email e senha.",
    loginErrWrong: "Email ou senha incorretos.",
    loginErrProfile: "Perfil não encontrado. Contate o suporte.",
    loginErrSession: "Sessão ativa em outro dispositivo.",
    loginErrExpired: "Acesso expirado. Contate o suporte.",
    loginErrInactive: "Acesso inativo. Contate o suporte.",
    forgotTitle: "Informe seu email. Você receberá um código de 6 dígitos para redefinir a senha.",
    forgotBtn: "ENVIAR CÓDIGO →",
    forgotLoading: "ENVIANDO...",
    forgotBack: "← Voltar ao login",
    otpSent: "✅ Email enviado para",
    otpTitle: "Insira o código de 6 dígitos recebido no email.",
    otpPlaceholder: "Código de 6 dígitos",
    otpBtn: "VERIFICAR CÓDIGO →",
    otpLoading: "VERIFICANDO...",
    otpResend: "← Reenviar código",
    newPassTitle: "Código verificado. Defina sua nova senha.",
    newPassPlaceholder: "Nova senha (mín. 6 caracteres)",
    newPassConfirm: "Confirmar senha",
    newPassBtn: "SALVAR NOVA SENHA →",
    newPassLoading: "SALVANDO...",
    newPassErrMatch: "As senhas não coincidem.",
    newPassErrShort: "A senha deve ter pelo menos 6 caracteres.",
    footer: "ToilZero · RavenLab · Acesso restrito",

    // HEADER APP
    sync: "✓ sincronizado",
    saving: "⟳ salvando...",
    loading: "⟳ carregando...",
    daysLeft: "d restantes",
    expired: "Expirado",
    tutorial: "? Tutorial",
    logout: "Sair",

    // TABS
    tabTradepack: "📦 Tradepack",
    tabHunt: "🏹 Hunt",
    tabMateriais: "💰 Materiais",
    tabInfusion: "✨ Infusion",
    tabCrafting: "⚒️ Crafting",
    tabCalibracao: "📐 Calibração",

    // SEÇÕES PRINCIPAIS
    secComparativo: "💰 Comparativo de Estratégias",
    secFazendoPacks: "📦 Fazendo os Packs Prime",
    secVendendo: "💰 Vendendo os Materiais",
    secDiferenca: "📊 Diferença de Estratégia",
    secBreakeven: "Break-even",
    labelSemana: "/sem",
    labelMes: "/mês",

    // OVERSUPPLY
    osPlayerLevel: "Nível do Player",
    osOversupply: "Oversupply Atual (%)",
    osThreshold: "Threshold:",
    osTaxExtra: "Tax extra:",
    osPenalty: "✅ Sem penalidade",
    osAlready: "já em OS",
    osCraftsOS: "Crafts → OS",
    osProfitOS: "Profit até OS",
    osCraftsMax: "Crafts → MAX",
    osProfitMax: "Profit até MAX",
    osMaterials: "Preços de materiais",
    osMaterialsHint:
      "Insira o preço de mercado de cada material. Os valores são aplicados automaticamente a todas as receitas que usam esse material.",
    osRecipes: "Receitas e margens calculadas",
    osFootnote:
      "Custo Mat. = soma de (qtd × preço) de cada material · Tax = tax base ajustada pelo oversupply atual · Crafts → OS = quantos crafts até atingir 100% de oversupply · Rankings só aparecem quando preço de venda e materiais estão preenchidos.",

    // CALIBRAÇÃO
    calTitle: "Calibração com Dados Reais",
    calHint: "Insira o QUEST recebido no chest de sexta. A IM total é calculada automaticamente.",
    calQUEST: "QUEST recebido",
    calQUESTHint: "Chest de sexta-feira",
    calApply: "APLICAR POOL RATE →",
    calApplied: "Pool Rate Aplicado",

    // INFUSION
    infCostEXP: "Melhor Custo por EXP",
    infHunt: "Melhor para Caçar",
    infFlip: "Melhor para Flip",
    infTargetEXP: "EXP necessário",
    infMarketFee: "Taxa do mercado (%)",
    infBestNow: "✅ Melhor custo-benefício atual",

    // FAQ
    faqLabel: "Dúvidas Frequentes",
    faqTitle: "Perguntas que todo player tem",
    faqs: [
      {
        q: "Como funciona a sincronização de preços do plano Guilda e Amigos?",
        a: "Quando você insere o preço de um material na aba Crafting, ele é salvo em tempo real para todos os membros da sua guilda ou grupo de amigos. Qualquer membro pode atualizar os valores e todos veem a mudança instantaneamente, sem precisar recarregar a página.",
      },
      {
        q: "Por que eu pago 4% de taxa ao vender no mercado?",
        a: "O jogo cobra 4% do valor de venda quando você anuncia um item no mercado. Na compra você não paga taxa — ela é cobrada apenas na venda/anúncio. O RavenLab aplica esse desconto automaticamente na coluna Receita quando o toggle de taxa de mercado está ativo.",
      },
      {
        q: "O que é a taxa de 4% do Exchange?",
        a: "Ao converter silver em QUEST (ou QUEST em silver) no Currency Exchange do jogo, você paga 4% de taxa em ambas as direções. Por isso o QUEST que você recebe é sempre ligeiramente menor do que o valor bruto calculado. Você pode ativar ou desativar essa taxa por aba.",
      },
      {
        q: "Como funciona o saque de QUEST e os 20% de taxa?",
        a: "Para sacar QUEST do jogo para a carteira, o jogo cobra aproximadamente 20% do valor total em silver. Se você tem Fee Credit acumulado (por ter gastado QUEST no jogo), esse valor é descontado antes do cálculo da taxa. Configure o seu Fee Credit na seção de Taxas de Saque.",
      },
      {
        q: "Como pagar a taxa de crafting em QUEST com desconto?",
        a: "Cada receita de crafting tem a opção de pagar a taxa em Silver ou em QUEST. Ao pagar em QUEST, você tem 20% de desconto sobre o valor em silver (esse desconto é fixo do jogo). Clique no botão S/Q em cada linha da tabela de crafting para alternar o modo.",
      },
      {
        q: "O que é o Pool Rate e como calibrar?",
        a: "O Pool Rate é a taxa de conversão entre IM (Influence Mercantil) e QUEST. Ele varia semanalmente conforme o volume do servidor. Para calibrar: toda sexta-feira, insira o QUEST que você recebeu no chest na aba Calibração e clique em Aplicar. O RavenLab calcula o pool rate real automaticamente.",
      },
      {
        q: "Como funciona o sub-craft de materiais no Oversupply?",
        a: "Na aba Crafting, materiais que possuem receita própria mostram um botão 🛒/⚒️. Ao ativar ⚒️, o custo daquele material passa a ser calculado com base na receita de produção (em vez do preço de mercado), incluindo o EXP dos crafts extras no total. Isso afeta o custo até o oversupply e o profit acumulado.",
      },
      {
        q: "Como funciona a previsão de QUEST da próxima sexta?",
        a: "Na aba Calibração, a seção de Previsão calcula automaticamente o QUEST esperado usando sua IM total configurada (Expedição + Packs) multiplicada pelo Pool Rate atual. O resultado mostra o valor bruto e líquido após as taxas de exchange e saque.",
      },
      {
        q: "Como pago minha assinatura?",
        a: "O pagamento é feito diretamente em silver no jogo — sem cartão, sem cadastro externo. Após o pagamento, o acesso é liberado manualmente em até 24 horas. Entre em contato com o Matz para combinar.",
      },
      {
        q: "Posso usar o RavenLab em mais de um dispositivo?",
        a: "Por segurança, o RavenLab permite apenas uma sessão ativa por vez. Se você fizer login em outro dispositivo, a sessão anterior é encerrada automaticamente.",
      },
    ],
    packConfig: "Configuração do Pack",
    packSelected: "Pack Selecionado",
    packsPerWeek: "Packs por Semana",
    silverPerPack: "Silver/Pack Entregue",
    silverHint: "Varia por demanda/rota",
    imBaseAuto: "IM Base/Pack (Automático)",
    certCost: "Custo Certificado",
    specialPacks: "Packs Especiais",
    packsEnhanced: "Packs com Enhanced",
    packsPlunder: "Packs no Plunder",
    enhancerTitle: "Primed Tradepack Enhancers",
    enhancerDesc:
      "Enhancers são obtidos pelo fator sorte no jogo, não comprados. São armazenados como cargas, capacidade máxima de 100. Cada pack Enhanced consome 1 carga.",
    enhancerGanhosLabel: "Cargas obtidas essa semana",
    enhancerGanhosHint: "Drop por fator sorte",
    enhancerStockLabel: "Estoque atual",
    enhancerStockHint: "Capacidade máxima: 100 cargas",
    enhancerDisponivel: "Disponível (estoque + ganhos)",
    enhancerRestante: "Restante após essa semana",
    enhancerApplyLabel: "Packs pra aplicar Enhancer",
    enhancerApplyHint: "+100% IM por pack · consome 1 carga cada",
    breakdown: "Breakdown dos",
    packs: "packs",
    normal: "Normais",
    totalIM: "Total IM packs/sem",
    activeBonuses: "Bônus Ativos",
    embeddedIM: "embutido no IM/pack observado",
    appliedIM: "aplicado sobre o IM observado",
    inactive: "inativo",
    breakEvenTitle: "Análise de Break-Even",
    resultVsSell: "Resultado vs Vender Materiais",
    worthIt: "COMPENSA",
    notWorthIt: "NÃO COMPENSA",
    imBaseRequired: "IM Base Necessária (sem Enhanced)",
    imBaseRequiredEnh: "IM Base Necessária (com Enhanced)",
    imBaseActual: "IM Base/Pack Atual",
    marginBase: "Margem (Base vs Necessária)",
    perPackComp: "Por Pack — Comparativo",
    makePackSilver: "Fazer Pack (Silver Líq.)",
    byProdCost: "por custo produção",
    questPerIM: "QUEST do Pack/IM",
    perPack: "por pack",
    questNetWeek: "QUEST IM Líq./sem",
    certCostLabel: "Custo Cert",
    sellMaterials: "Vender Materiais",
    questIMMonth: "QUEST IM Líq./mês",
    expedition: "Expedição",
    gemsAccum: "Joias Acumuladas",
    imExpWeek: "IM Expedição/Semana",
    marketPool: "Mercado & Pool",
    questPrice: "Preço do QUEST",
    silverPerQUEST: "Silver por QUEST",
    poolRate: "Pool Rate",
    weeklyCalib: "Calibração Semanal",
    huntConfig: "Configuração de Hunt",
    huntTitle: "Hunt & Mineração",
    huntHours: "Horas/dia",
    huntAddon: "Addon",
    huntInfusion: "Infusion",
    huntNPC: "Silver NPC/hora",
    huntProjections: "Projeções",
    miningTitle: "Mineração",
    comparison: "Comparativo Final",
    matsTitle: "Materiais do Pack",
    matsProd: "Custo Produção",
    matsMkt: "Preço Mkt",
    matsQuest: "Usar QUEST (-20%)",
    lastCalib: "Última Calibração Aplicada",
    calibApplied: "Calibração aplicada em",
    secComparativo2: "💰 Comparativo de Estratégias",
    secFazendoPacks2: "📦 Fazendo os Packs Prime",
    secVendendo2: "💰 Vendendo os Materiais",
    secDiferenca2: "📊 Diferença de Estratégia",
  },
  en: {
    // NAV / GENERAL
    enter: "LOGIN →",
    tools: "Tools",
    plans: "Plans",
    contactMatz: "CONTACT MATZ",
    contactMatzArrow: "CONTACT MATZ →",
    backToSite: "← Back to site",
    notAffiliated: "Not affiliated with RavenQuest or Tavernlight Games",
    tagline: "RavenQuest · Economy Intelligence",

    // HERO
    heroSub:
      "The most complete set of economic tools for RavenQuest players. Calculate margins, oversupply, infusions and much more.",
    viewTools: "VIEW TOOLS",
    accessNow: "GET ACCESS NOW →",
    stat1: "Tools",
    stat2: "Crafting recipes",
    stat3: "Professions",
    stat4: "Real prices",

    // FEATURES
    featuresLabel: "Tools",
    featuresTitle: "Everything you need to maximize profit",
    f1t: "Tradepack Prime",
    f1d: "Calculate the real margin of your packs with Enhanced and Plunder support. Automatic break-even and strategy comparison.",
    f2t: "Hunt & Mining",
    f2d: "Project your silver/hour from hunting with addons and infusions. Compare Hunt vs Mining vs Tradepack in real time.",
    f3t: "Infusion Analyzer",
    f3d: "Cost-per-EXP ranking, best infusion for hunting and flip calculator with configurable market fee.",
    f4t: "Crafting & Oversupply",
    f4d: "Calculate the real margin per recipe using your server's prices. Know exactly how many crafts until oversupply kicks in.",
    f5t: "Pool Rate Calibration",
    f5d: "Enter the QUEST received from the Friday chest and calibrate the real pool rate of your server for accurate projections.",
    f6t: "Materials",
    f6d: "Material table per pack with production cost vs market price. QUEST discount toggle per material.",

    // PRICING
    pricingLabel: "Plans",
    pricingTitle: "Paid in silver, directly in-game",
    pricingSub: "No card. No external signup. Pay the silver, get the access.",
    p1n: "Guild Pass",
    p1p: "35kk",
    p1per: "silver/week per member",
    p1d: "For guilds. Minimum 10 members. Market prices synced in real time across all members.",
    p2n: "Friends Plan",
    p2p: "35kk",
    p2per: "silver/week per person",
    p2d: "For friend groups. Minimum 5 people. Market prices updated automatically for everyone in the group.",
    p3n: "Solo Pass",
    p3p: "40kk",
    p3per: "silver/week",
    p3d: "For any player who wants full individual access.",
    popular: "Most popular",
    p4n: "Via Streamer",
    p4p: "36kk",
    p4per: "silver/week",
    p4d: "Use your favorite streamer's coupon and save 10%.",
    pricingNote:
      "Payment made directly in silver in-game · Access granted manually within 24h · Streamer coupons available · Guild Pass and Friends Plan price is per member",

    // CTA FINAL
    ctaTitle: "Ready to profit more?",
    ctaDesc: "Contact Matz to request access. RavenLab pays for itself in the first week of use.",

    // LOGIN
    loginAccess: "RavenQuest · Economy Intelligence",
    loginWelcome: "Welcome to",
    loginEmail: "Your access email",
    loginPass: "Password",
    loginBtn: "LOGIN →",
    loginLoading: "CHECKING...",
    loginForgot: "Forgot my password",
    loginErrEmpty: "Please fill in email and password.",
    loginErrWrong: "Incorrect email or password.",
    loginErrProfile: "Profile not found. Contact support.",
    loginErrSession: "Active session on another device.",
    loginErrExpired: "Access expired. Contact support.",
    loginErrInactive: "Access inactive. Contact support.",
    forgotTitle: "Enter your email. You will receive a 6-digit code to reset your password.",
    forgotBtn: "SEND CODE →",
    forgotLoading: "SENDING...",
    forgotBack: "← Back to login",
    otpSent: "✅ Email sent to",
    otpTitle: "Enter the 6-digit code received by email.",
    otpPlaceholder: "6-digit code",
    otpBtn: "VERIFY CODE →",
    otpLoading: "VERIFYING...",
    otpResend: "← Resend code",
    newPassTitle: "Code verified. Set your new password.",
    newPassPlaceholder: "New password (min. 6 characters)",
    newPassConfirm: "Confirm password",
    newPassBtn: "SAVE NEW PASSWORD →",
    newPassLoading: "SAVING...",
    newPassErrMatch: "Passwords do not match.",
    newPassErrShort: "Password must be at least 6 characters.",
    footer: "ToilZero · RavenLab · Restricted access",

    // HEADER APP
    sync: "✓ synced",
    saving: "⟳ saving...",
    loading: "⟳ loading...",
    daysLeft: "d left",
    expired: "Expired",
    tutorial: "? Tutorial",
    logout: "Logout",

    // TABS
    tabTradepack: "📦 Tradepack",
    tabHunt: "🏹 Hunt",
    tabMateriais: "💰 Materials",
    tabInfusion: "✨ Infusion",
    tabCrafting: "⚒️ Crafting",
    tabCalibracao: "📐 Calibration",

    // MAIN SECTIONS
    secComparativo: "💰 Strategy Comparison",
    secFazendoPacks: "📦 Crafting Prime Packs",
    secVendendo: "💰 Selling Materials",
    secDiferenca: "📊 Strategy Difference",
    secBreakeven: "Break-even",
    labelSemana: "/week",
    labelMes: "/month",

    // OVERSUPPLY
    osPlayerLevel: "Player Level",
    osOversupply: "Current Oversupply (%)",
    osThreshold: "Threshold:",
    osTaxExtra: "Extra tax:",
    osPenalty: "✅ No penalty",
    osAlready: "already in OS",
    osCraftsOS: "Crafts → OS",
    osProfitOS: "Profit to OS",
    osCraftsMax: "Crafts → MAX",
    osProfitMax: "Profit to MAX",
    osMaterials: "Material prices",
    osMaterialsHint:
      "Enter the market price of each material. Values are automatically applied to all recipes that use that material.",
    osRecipes: "Recipes and calculated margins",
    osFootnote:
      "Mat. Cost = sum of (qty × price) per material · Tax = base tax adjusted by current oversupply · Crafts → OS = crafts needed to reach 100% oversupply · Rankings only appear when sell price and materials are filled.",

    // CALIBRATION
    calTitle: "Calibration with Real Data",
    calHint: "Enter the QUEST received from the Friday chest. Total IM is calculated automatically.",
    calQUEST: "QUEST received",
    calQUESTHint: "Friday chest",
    calApply: "APPLY POOL RATE →",
    calApplied: "Applied Pool Rate",

    // INFUSION
    infCostEXP: "Best Cost per EXP",
    infHunt: "Best for Hunting",
    infFlip: "Best for Flip",
    infTargetEXP: "Required EXP",
    infMarketFee: "Market fee (%)",
    infBestNow: "✅ Best value right now",

    // FAQ
    faqLabel: "FAQ",
    faqTitle: "Questions every player asks",
    faqs: [
      {
        q: "How does price sync work for Guild and Friends plans?",
        a: "When you enter a material price in the Crafting tab, it's saved in real time for all members of your guild or friend group. Any member can update values and everyone sees the change instantly without refreshing the page.",
      },
      {
        q: "Why do I pay a 4% fee when selling on the market?",
        a: "The game charges 4% of the sell price when you list an item on the market. You don't pay a fee when buying — it's only charged on the sell/listing side. RavenLab applies this discount automatically in the Revenue column when the market tax toggle is active.",
      },
      {
        q: "What is the 4% Exchange fee?",
        a: "When converting silver to QUEST (or QUEST to silver) in the game's Currency Exchange, you pay a 4% fee in both directions. That's why the QUEST you receive is always slightly less than the gross calculated value. You can enable or disable this fee per tab.",
      },
      {
        q: "How does the QUEST withdrawal fee work?",
        a: "To withdraw QUEST from the game to your wallet, the game charges approximately 20% of the total value in silver. If you have accumulated Fee Credit (from spending QUEST in-game), that amount is deducted before calculating the fee. Configure your Fee Credit in the Withdrawal Fee section.",
      },
      {
        q: "How do I pay crafting tax in QUEST with a discount?",
        a: "Each crafting recipe has the option to pay the tax in Silver or QUEST. Paying in QUEST gives you a 20% discount on the silver value (this discount is fixed by the game). Click the S/Q button on each row in the crafting table to switch modes.",
      },
      {
        q: "What is the Pool Rate and how do I calibrate it?",
        a: "The Pool Rate is the conversion rate between IM (Mercantile Influence) and QUEST. It varies weekly based on server volume. To calibrate: every Friday, enter the QUEST you received from the chest in the Calibration tab and click Apply. RavenLab calculates the real pool rate automatically.",
      },
      {
        q: "How does sub-crafting work in Oversupply?",
        a: "In the Crafting tab, materials that have their own recipe show a 🛒/⚒️ button. When you activate ⚒️, that material's cost is calculated based on its production recipe (instead of market price), including EXP from the extra crafts in the total. This affects the cost to oversupply and accumulated profit.",
      },
      {
        q: "How does the QUEST forecast work?",
        a: "In the Calibration tab, the Forecast section automatically calculates expected QUEST using your configured total IM (Expedition + Packs) multiplied by the current Pool Rate. The result shows gross and net values after exchange and withdrawal fees.",
      },
      {
        q: "How do I pay for my subscription?",
        a: "Payment is made directly in silver in-game — no card, no external signup. After payment, access is granted manually within 24 hours. Contact Matz to arrange it.",
      },
      {
        q: "Can I use RavenLab on more than one device?",
        a: "For security, RavenLab only allows one active session at a time. If you log in on another device, the previous session is automatically terminated.",
      },
    ],
    packConfig: "Pack Configuration",
    packSelected: "Selected Pack",
    packsPerWeek: "Packs per Week",
    silverPerPack: "Silver/Pack Delivered",
    silverHint: "Varies by demand/route",
    imBaseAuto: "Base IM/Pack (Automatic)",
    certCost: "Certificate Cost",
    specialPacks: "Special Packs",
    packsEnhanced: "Packs with Enhanced",
    packsPlunder: "Packs in Plunder",
    enhancerTitle: "Primed Tradepack Enhancers",
    enhancerDesc:
      "Enhancers are obtained by luck factor in-game, not purchased. They're stored as charges, capacity max 100. Each Enhanced pack consumes 1 charge.",
    enhancerGanhosLabel: "Charges gained this week",
    enhancerGanhosHint: "Luck factor drop",
    enhancerStockLabel: "Current stock",
    enhancerStockHint: "Max capacity: 100 charges",
    enhancerDisponivel: "Available (stock + gained)",
    enhancerRestante: "Remaining after this week",
    enhancerApplyLabel: "Packs to apply Enhancer",
    enhancerApplyHint: "+100% IM per pack · consumes 1 charge each",
    breakdown: "Breakdown of",
    packs: "packs",
    normal: "Normal",
    totalIM: "Total IM packs/week",
    activeBonuses: "Active Bonuses",
    embeddedIM: "embedded in observed IM/pack",
    appliedIM: "applied over observed IM",
    inactive: "inactive",
    breakEvenTitle: "Break-Even Analysis",
    resultVsSell: "Result vs Selling Materials",
    worthIt: "WORTHWHILE",
    notWorthIt: "NOT WORTHWHILE",
    imBaseRequired: "Base IM Required (no Enhanced)",
    imBaseRequiredEnh: "Base IM Required (with Enhanced)",
    imBaseActual: "Current Base IM/Pack",
    marginBase: "Margin (Base vs Required)",
    perPackComp: "Per Pack — Comparison",
    makePackSilver: "Craft Pack (Net Silver)",
    byProdCost: "by production cost",
    questPerIM: "QUEST per Pack/IM",
    perPack: "per pack",
    questNetWeek: "Net QUEST IM/week",
    certCostLabel: "Cert Cost",
    sellMaterials: "Sell Materials",
    questIMMonth: "Net QUEST IM/month",
    expedition: "Expedition",
    gemsAccum: "Accumulated Gems",
    imExpWeek: "Expedition IM/Week",
    marketPool: "Market & Pool",
    questPrice: "QUEST Price",
    silverPerQUEST: "Silver per QUEST",
    poolRate: "Pool Rate",
    weeklyCalib: "Weekly Calibration",
    huntConfig: "Hunt Configuration",
    huntTitle: "Hunt & Mining",
    huntHours: "Hours/day",
    huntAddon: "Addon",
    huntInfusion: "Infusion",
    huntNPC: "NPC Silver/hour",
    huntProjections: "Projections",
    miningTitle: "Mining",
    comparison: "Final Comparison",
    matsTitle: "Pack Materials",
    matsProd: "Production Cost",
    matsMkt: "Market Price",
    matsQuest: "Use QUEST (-20%)",
    lastCalib: "Last Applied Calibration",
    calibApplied: "Calibration applied on",
    secComparativo2: "💰 Strategy Comparison",
    secFazendoPacks2: "📦 Crafting Prime Packs",
    secVendendo2: "💰 Selling Materials",
    secDiferenca2: "📊 Strategy Difference",
  },
};

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
function NumInput({ value, onChange, min = 0, max, style, placeholder, format, decimals }) {
  const [local, setLocal] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setLocal(String(value));
  }, [value, focused]);

  // Parser robusto para formato BR (65.100 = 65100, 0,0042 = 0.0042)
  const parseBR = (raw) => {
    const str = String(raw).trim();
    if (str.includes(",")) {
      // vírgula = separador decimal → remove pontos (milhar), troca vírgula por ponto
      return parseFloat(str.replace(/\./g, "").replace(",", "."));
    }
    // sem vírgula: verifica se ponto é separador de milhar
    const parts = str.split(".");
    if (parts.length === 2 && parts[1].length === 3 && parts[0].length > 0 && !str.startsWith("0.")) {
      return parseFloat(str.replace(/\./g, ""));
    }
    return parseFloat(str);
  };

  const commit = (raw) => {
    const parsed = parseBR(raw);
    let final = isNaN(parsed) ? (min ?? 0) : parsed;
    if (max !== undefined) final = Math.min(final, max);
    if (min !== undefined) final = Math.max(final, min);
    onChange(final);
    setLocal(String(final));
  };

  // Display: usa formato customizado ou detecta decimais automaticamente
  const displayValue = focused
    ? local
    : format
      ? format(value)
      : value === 0
        ? "0"
        : value < 0.01 && value > 0
          ? value.toFixed(decimals ?? 8)
          : value < 1 && value > 0
            ? value.toFixed(decimals ?? 4)
            : fmtInt(value);

  return (
    <input
      type="text"
      inputMode="decimal"
      placeholder={placeholder || "0"}
      value={displayValue}
      onChange={(e) => {
        setLocal(e.target.value);
        const p = parseBR(e.target.value);
        if (!isNaN(p)) onChange(p);
      }}
      onFocus={() => {
        setFocused(true);
        setLocal(String(value));
      }}
      onBlur={() => {
        setFocused(false);
        commit(local);
      }}
      style={style}
    />
  );
}
// ── FORMULA PANEL ─────────────────────────────────────────────────────────
function FormulaPanel({ title, descricao, formulas, items }) {
  const [open, setOpen] = React.useState(false);
  // Suporta tanto items (novo) quanto formulas (legado)
  const fmtItems = items || (formulas || []).map((f) => ({ label: f.label, desc: f.nota || "", formula: f.formula }));
  return (
    <div style={{ marginBottom: 16, border: "1px solid rgba(96,165,250,0.12)", borderRadius: 10, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(96,165,250,0.04)",
          border: "none",
          padding: "12px 18px",
          cursor: "pointer",
          fontFamily: "'Space Mono',monospace",
        }}
      >
        <span style={{ fontSize: 11, color: "#60a5fa", letterSpacing: "0.1em" }}>📐 {title}</span>
        <span
          style={{
            color: open ? "#c4a050" : "#8fa0b8",
            fontSize: 14,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {descricao && (
            <div
              style={{
                fontSize: 10,
                color: "#8fa0b8",
                lineHeight: 1.8,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: 12,
              }}
            >
              {descricao}
            </div>
          )}
          {fmtItems.map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: "#e0eaf8", fontWeight: "bold", marginBottom: 6 }}>{item.label}</div>
              {item.desc && (
                <div style={{ fontSize: 10, color: "#8fa0b8", lineHeight: 1.8, marginBottom: 8 }}>{item.desc}</div>
              )}
              <div
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(96,165,250,0.1)",
                  borderRadius: 6,
                  padding: "10px 14px",
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 10,
                  color: "#a78bfa",
                  lineHeight: 1.8,
                  whiteSpace: "pre",
                }}
              >
                {item.formula}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── FAQ ITEM ───────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid rgba(96,165,250,0.08)",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 4,
        transition: "all 0.2s",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: open ? "rgba(30,58,95,0.4)" : "rgba(8,15,30,0.8)",
          border: "none",
          padding: "18px 24px",
          cursor: "pointer",
          fontFamily: "'Space Mono', monospace",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: open ? "#e0eaf8" : "rgba(224,234,248,0.7)",
            fontWeight: open ? "bold" : "normal",
            letterSpacing: "0.02em",
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: open ? "#c4a050" : "rgba(96,165,250,0.4)",
            fontSize: 16,
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            background: "rgba(13,21,37,0.6)",
            padding: "16px 24px 20px",
            borderTop: "1px solid rgba(96,165,250,0.08)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(143,160,184,0.75)",
              lineHeight: 1.9,
              margin: 0,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

// ── EM BREVE ───────────────────────────────────────────────────────────────
function EmBreve({ lang }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 320,
        textAlign: "center",
        padding: 40,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 20 }}>🔒</div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 18,
          fontWeight: "bold",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {lang === "en" ? "Coming Soon" : "Em Breve"}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(143,160,184,0.4)",
          lineHeight: 1.8,
          maxWidth: 400,
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {lang === "en"
          ? "This section is under development and will be available in a future update."
          : "Esta seção está em desenvolvimento e estará disponível em uma próxima atualização."}
      </div>
    </div>
  );
}
function LangToggle({ lang, setLang }) {
  return (
    <div
      style={{
        display: "flex",
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(96,165,250,0.15)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {["ptBR", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? "rgba(196,160,80,0.2)" : "transparent",
            border: "none",
            color: lang === l ? "#c4a050" : "rgba(224,234,248,0.3)",
            padding: "5px 10px",
            cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            fontWeight: lang === l ? "bold" : "normal",
            letterSpacing: "0.08em",
          }}
        >
          {l === "ptBR" ? "🇧🇷 PT" : "🇺🇸 EN"}
        </button>
      ))}
    </div>
  );
}

function LandingPage({ onEnter, lang, setLang }) {
  const t = TR[lang];
  const [hovered, setHovered] = useState(null);

  const features = [
    { icon: "📦", title: t.f1t, desc: t.f1d, color: "#c4a050" },
    { icon: "🏹", title: t.f2t, desc: t.f2d, color: "#60a5fa" },
    { icon: "✨", title: t.f3t, desc: t.f3d, color: "#a78bfa" },
    { icon: "⚒️", title: t.f4t, desc: t.f4d, color: "#4ade80" },
    { icon: "📐", title: t.f5t, desc: t.f5d, color: "#fb923c" },
    { icon: "💰", title: t.f6t, desc: t.f6d, color: "#f87171" },
  ];

  const plans = [
    { nome: t.p1n, preco: t.p1p, periodo: t.p1per, desc: t.p1d, destaque: false, cor: "#60a5fa" },
    { nome: t.p2n, preco: t.p2p, periodo: t.p2per, desc: t.p2d, destaque: false, cor: "#4ade80" },
    { nome: t.p3n, preco: t.p3p, periodo: t.p3per, desc: t.p3d, destaque: true, cor: "#c4a050" },
    { nome: t.p4n, preco: t.p4p, periodo: t.p4per, desc: t.p4d, destaque: false, cor: "#a78bfa" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050810",
        fontFamily: "'Space Mono', monospace",
        color: "#e0eaf8",
        overflowX: "hidden",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* BG decorativo */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,58,95,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,160,80,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* NAVBAR */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid rgba(96,165,250,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e0eaf8",
            }}
          >
            RavenLab
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            href="#features"
            style={{
              fontSize: 10,
              color: "rgba(224,234,248,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {t.tools}
          </a>
          <a
            href="#pricing"
            style={{
              fontSize: 10,
              color: "rgba(224,234,248,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {t.plans}
          </a>
          <LangToggle lang={lang} setLang={setLang} />
          <button
            onClick={onEnter}
            style={{
              background: "linear-gradient(135deg, #c4a050, #8a6a20)",
              border: "none",
              borderRadius: 7,
              color: "#000",
              padding: "8px 20px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: "bold",
              letterSpacing: "0.1em",
            }}
          >
            {t.enter}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "100px 24px 80px" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(196,160,80,0.08)",
            border: "1px solid rgba(196,160,80,0.2)",
            borderRadius: 20,
            padding: "5px 16px",
            fontSize: 10,
            color: "#c4a050",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {t.tagline}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 120, height: 120, objectFit: "contain" }} />
        </div>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#e0eaf8",
            margin: "0 0 8px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          Raven<span style={{ color: "#c4a050" }}>Lab</span>
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(143,160,184,0.8)",
            letterSpacing: "0.04em",
            maxWidth: 520,
            margin: "16px auto 48px",
          }}
        >
          {t.heroSub}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={onEnter}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            style={{
              background: "linear-gradient(135deg, #c4a050, #8a6a20)",
              border: "none",
              borderRadius: 8,
              color: "#000",
              padding: "14px 32px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              fontWeight: "bold",
              letterSpacing: "0.1em",
              transition: "transform 0.2s",
            }}
          >
            {t.accessNow}
          </button>
          <a
            href="#features"
            style={{
              background: "rgba(30,58,95,0.4)",
              border: "1px solid rgba(96,165,250,0.2)",
              borderRadius: 8,
              color: "#60a5fa",
              padding: "14px 28px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t.viewTools}
          </a>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
          {[
            { valor: "6", label: t.stat1 },
            { valor: "70+", label: t.stat2 },
            { valor: "5", label: t.stat3 },
            { valor: "100%", label: t.stat4 },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c4a050", letterSpacing: "0.05em" }}>{s.valor}</div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(143,160,184,0.5)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{ position: "relative", zIndex: 1, padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10,
              color: "rgba(96,165,250,0.45)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {t.featuresLabel}
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#e0eaf8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {t.featuresTitle}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {features.map((f) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(f.title)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === f.title ? "#0d1525" : "#080f1e",
                border: `1px solid ${hovered === f.title ? f.color + "40" : "rgba(96,165,250,0.07)"}`,
                borderRadius: 12,
                padding: "24px 28px",
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: hovered === f.title ? f.color : "#e0eaf8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: 11, color: "rgba(143,160,184,0.6)", lineHeight: 1.8 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        style={{ position: "relative", zIndex: 1, padding: "80px 48px", maxWidth: 960, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10,
              color: "rgba(96,165,250,0.45)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {t.pricingLabel}
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#e0eaf8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            {t.pricingTitle}
          </h2>
          <p style={{ fontSize: 11, color: "rgba(143,160,184,0.5)", letterSpacing: "0.06em" }}>{t.pricingSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
          {plans.map((p) => (
            <div
              key={p.nome}
              style={{
                background: p.destaque ? "linear-gradient(160deg, #0d1525, #101e35)" : "#080f1e",
                border: `1px solid ${p.destaque ? "rgba(196,160,80,0.4)" : "rgba(96,165,250,0.08)"}`,
                borderRadius: 14,
                padding: "32px 28px",
                position: "relative",
                textAlign: "center",
              }}
            >
              {p.destaque && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #c4a050, #8a6a20)",
                    borderRadius: 10,
                    padding: "3px 14px",
                    fontSize: 9,
                    fontWeight: "bold",
                    color: "#000",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.popular}
                </div>
              )}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: p.cor,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {p.nome}
              </div>
              <div
                style={{ fontSize: 32, fontWeight: 700, color: "#e0eaf8", letterSpacing: "0.04em", marginBottom: 4 }}
              >
                {p.preco}
              </div>
              <div style={{ fontSize: 10, color: "rgba(143,160,184,0.5)", letterSpacing: "0.1em", marginBottom: 20 }}>
                {p.periodo}
              </div>
              <div style={{ fontSize: 11, color: "rgba(143,160,184,0.6)", lineHeight: 1.8, marginBottom: 28 }}>
                {p.desc}
              </div>
              <button
                style={{
                  background: p.destaque ? "linear-gradient(135deg, #c4a050, #8a6a20)" : "rgba(30,58,95,0.5)",
                  border: p.destaque ? "none" : `1px solid ${p.cor}30`,
                  borderRadius: 8,
                  color: p.destaque ? "#000" : p.cor,
                  padding: "10px 24px",
                  cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  fontWeight: "bold",
                  letterSpacing: "0.06em",
                  width: "100%",
                }}
              >
                {t.contactMatz}
              </button>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 10,
            color: "rgba(143,160,184,0.35)",
            letterSpacing: "0.1em",
            lineHeight: 1.8,
          }}
        >
          {t.pricingNote}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 48px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10,
              color: "rgba(96,165,250,0.45)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {t.faqLabel}
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#e0eaf8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {t.faqTitle}
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {t.faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "80px 24px 100px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30,58,95,0.4), rgba(13,21,37,0.6))",
            border: "1px solid rgba(96,165,250,0.1)",
            borderRadius: 20,
            padding: "56px 40px",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#e0eaf8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.ctaTitle}
          </div>
          <p style={{ fontSize: 11, color: "rgba(143,160,184,0.6)", lineHeight: 1.9, marginBottom: 32 }}>{t.ctaDesc}</p>
          <button
            onClick={onEnter}
            style={{
              background: "linear-gradient(135deg, #c4a050, #8a6a20)",
              border: "none",
              borderRadius: 8,
              color: "#000",
              padding: "14px 36px",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              fontWeight: "bold",
              letterSpacing: "0.08em",
            }}
          >
            {t.contactMatzArrow}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(96,165,250,0.06)",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 24, height: 24, objectFit: "contain" }} />
          <span
            style={{
              fontSize: 10,
              color: "rgba(143,160,184,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            RavenLab · ToilZero
          </span>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
        <div style={{ fontSize: 10, color: "rgba(143,160,184,0.25)", letterSpacing: "0.08em" }}>{t.notAffiliated}</div>
      </footer>
    </div>
  );
}
// ── TAX TOGGLE ────────────────────────────────────────────────────────────
function TaxToggle({ label, active, onChange, detail }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: active ? "rgba(196,160,80,0.06)" : "rgba(0,0,0,0.2)",
        border: `1px solid ${active ? "rgba(196,160,80,0.25)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 8,
        padding: "10px 14px",
        marginBottom: 8,
      }}
    >
      <div>
        <div style={{ fontSize: 11, color: active ? "#f0e6c8" : "#606070", fontFamily: "'Space Mono', monospace" }}>
          {label}
        </div>
        {detail && (
          <div
            style={{ fontSize: 10, color: active ? "rgba(196,160,80,0.6)" : "rgba(143,160,184,0.45)", marginTop: 3 }}
          >
            {detail}
          </div>
        )}
      </div>
      <div
        onClick={() => onChange(!active)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: active ? "#c4a050" : "#303040",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: active ? 18 : 3,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </div>
    </div>
  );
}

// ── PAINEL DE SAQUE (global, reutilizável) ─────────────────────────────────
function SaquePanel({ taxSaqueAtivo, setTaxSaqueAtivo, taxSaquePct, setTaxSaquePct, feeCredit, setFeeCredit, lang }) {
  const t = TR[lang];
  return (
    <div
      style={{
        background: "rgba(248,113,113,0.04)",
        border: "1px solid rgba(248,113,113,0.15)",
        borderRadius: 10,
        padding: "14px 16px",
        marginTop: 12,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "rgba(248,113,113,0.6)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {lang === "en" ? "Withdraw Fee" : "Taxa de Saque QUEST"}
      </div>
      <TaxToggle
        label={lang === "en" ? `Withdraw tax (${taxSaquePct}%)` : `Taxa de saque (${taxSaquePct}%)`}
        detail={lang === "en" ? "Paid in silver on total QUEST withdrawn" : "Paga em silver sobre o total sacado"}
        active={taxSaqueAtivo}
        onChange={setTaxSaqueAtivo}
      />
      {taxSaqueAtivo && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: "#8fa0b8", marginBottom: 4 }}>{lang === "en" ? "Tax %" : "Taxa %"}</div>
            <NumInput
              value={taxSaquePct}
              onChange={(v) => setTaxSaquePct(Math.max(0, Math.min(100, v)))}
              min={0}
              max={100}
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(248,113,113,0.3)",
                borderRadius: 6,
                color: "#f87171",
                padding: "6px 10px",
                fontSize: 12,
                width: "100%",
                fontFamily: "'Space Mono',monospace",
                outline: "none",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#8fa0b8", marginBottom: 4 }}>Fee Credit (QUEST)</div>
            <NumInput
              value={feeCredit}
              onChange={setFeeCredit}
              min={0}
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: 6,
                color: "#4ade80",
                padding: "6px 10px",
                fontSize: 12,
                width: "100%",
                fontFamily: "'Space Mono',monospace",
                outline: "none",
              }}
            />
            <div style={{ fontSize: 9, color: "rgba(143,160,184,0.45)", marginTop: 3 }}>
              {lang === "en" ? "QUEST exempt from tax" : "QUEST isentos de taxa"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── LOGIN COM SUPABASE ─────────────────────────────────────────────────────
function LoginScreen({ onLogin, onBack, lang }) {
  const t = TR[lang || "ptBR"];
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
    if (!email || !senha) {
      setErro(t.loginErrEmpty);
      return;
    }
    setLoading(true);
    setErro("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) {
      setErro(t.loginErrWrong);
      setLoading(false);
      return;
    }
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();
    if (profileError || !profile) {
      await supabase.auth.signOut();
      setErro(t.loginErrProfile);
      setLoading(false);
      return;
    }
    if (!profile.active) {
      await supabase.auth.signOut();
      setErro("Acesso suspenso. Contate o suporte.");
      setLoading(false);
      return;
    }
    if (new Date(profile.expires_at) < new Date()) {
      await supabase.auth.signOut();
      setErro(t.loginErrExpired);
      setLoading(false);
      return;
    }
    const { error: upsertError } = await supabase.from("active_sessions").upsert({
      user_id: data.user.id,
      session_id: tabId,
      updated_at: new Date().toISOString(),
    });
    if (upsertError) {
      await supabase.auth.signOut();
      setErro("Erro ao registrar sessão. Tente novamente.");
      setLoading(false);
      return;
    }
    onLogin(data.user, tabId, profile);
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!emailRecovery) {
      setErro(t.loginErrEmpty);
      return;
    }
    setLoading(true);
    setErro("");
    const { error } = await supabase.auth.resetPasswordForEmail(emailRecovery);
    if (error) {
      setErro("Erro ao enviar email. Verifique o endereço.");
      setLoading(false);
      return;
    }
    setModo("otp");
    setLoading(false);
  };

  const handleOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      setErro("Informe o código de 6 dígitos.");
      return;
    }
    setLoading(true);
    setErro("");
    const { error } = await supabase.auth.verifyOtp({
      email: emailRecovery,
      token: otpCode,
      type: "recovery",
    });
    if (error) {
      setErro("Código inválido ou expirado. Solicite um novo.");
      setLoading(false);
      return;
    }
    setModo("newpassword");
    setLoading(false);
  };

  const handleNewPassword = async () => {
    if (!novaSenha || !confirmar) {
      setErro("Preencha os dois campos.");
      return;
    }
    if (novaSenha.length < 6) {
      setErro(t.newPassErrShort);
      return;
    }
    if (novaSenha !== confirmar) {
      setErro(t.newPassErrMatch);
      return;
    }
    setLoading(true);
    setErro("");
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    if (error) {
      setErro("Erro ao atualizar senha. Tente novamente.");
      setLoading(false);
      return;
    }
    await supabase.auth.signOut();
    sessionStorage.removeItem("pendingRecovery");
    setModo("login");
    setErro("");
    setNovaSenha("");
    setConfirmar("");
    setOtpCode("");
    setEmailRecovery("");
    setLoading(false);
    alert("✅ Senha atualizada! Faça login com a nova senha.");
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    background: BG_CARD,
    border: `1px solid ${hasError ? "rgba(248,113,113,0.6)" : "rgba(96,165,250,0.15)"}`,
    borderRadius: 8,
    color: TEXT_PRIM,
    padding: "12px 16px",
    fontSize: 14,
    fontFamily: "'Space Mono', monospace",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 10,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG_DEEP,
        backgroundImage: "radial-gradient(ellipse at 50% 30%, rgba(30,58,95,0.4) 0%, transparent 65%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div
        style={{
          background: BG_SURFACE,
          border: "1px solid rgba(96,165,250,0.12)",
          borderRadius: 16,
          padding: "40px 48px",
          textAlign: "center",
          width: 380,
        }}
      >
        {/* Logo RavenLab */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 120, height: 120, objectFit: "contain" }} />
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "rgba(96,165,250,0.4)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {t.loginAccess}
        </div>

        {/* LOGIN */}
        {modo === "login" && (
          <>
            <input
              type="email"
              placeholder={t.loginEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={inputStyle(false)}
            />
            <input
              type="password"
              placeholder={t.loginPass}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={inputStyle(!!erro)}
            />
            {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(196,160,80,0.3)" : "linear-gradient(135deg, #c4a050, #8a6a20)",
                border: "none",
                borderRadius: 8,
                color: loading ? "#888" : "#000",
                padding: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: "bold",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              {loading ? t.loginLoading : t.loginBtn}
            </button>
            <button
              onClick={() => {
                setModo("forgot");
                setErro("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(96,165,250,0.45)",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              {t.loginForgot}
            </button>
          </>
        )}

        {/* ESQUECI MINHA SENHA */}
        {modo === "forgot" && (
          <>
            <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>{t.forgotTitle}</div>
            <input
              type="email"
              placeholder={t.loginEmail}
              value={emailRecovery}
              onChange={(e) => setEmailRecovery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleForgot()}
              style={inputStyle(!!erro)}
            />
            {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
            <button
              onClick={handleForgot}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)",
                border: "none",
                borderRadius: 8,
                color: loading ? "#888" : "#000",
                padding: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: "bold",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              {loading ? t.forgotLoading : t.forgotBtn}
            </button>
            <button
              onClick={() => {
                setModo("login");
                setErro("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(96,165,250,0.45)",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {t.forgotBack}
            </button>
          </>
        )}

        {/* INSERIR CÓDIGO OTP */}
        {modo === "otp" && (
          <>
            <div style={{ color: green, fontSize: 11, marginBottom: 16 }}>
              {t.otpSent} {emailRecovery}
            </div>
            <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>{t.otpTitle}</div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              placeholder={t.otpPlaceholder}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              onKeyDown={(e) => e.key === "Enter" && handleOtp()}
              style={{ ...inputStyle(!!erro), fontSize: 24, letterSpacing: "0.3em", textAlign: "center" }}
            />
            {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
            <button
              onClick={handleOtp}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)",
                border: "none",
                borderRadius: 8,
                color: loading ? "#888" : "#000",
                padding: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: "bold",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              {loading ? t.otpLoading : t.otpBtn}
            </button>
            <button
              onClick={() => {
                setModo("forgot");
                setErro("");
                setOtpCode("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(96,165,250,0.45)",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {t.otpResend}
            </button>
          </>
        )}

        {/* NOVA SENHA */}
        {modo === "newpassword" && (
          <>
            <div style={{ color: TEXT_DIM, fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>{t.newPassTitle}</div>
            <input
              type="password"
              placeholder={t.newPassPlaceholder}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              style={inputStyle(false)}
            />
            <input
              type="password"
              placeholder={t.newPassConfirm}
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewPassword()}
              style={inputStyle(!!erro)}
            />
            {erro && <div style={{ color: "#f87171", fontSize: 11, marginBottom: 12 }}>❌ {erro}</div>}
            <button
              onClick={handleNewPassword}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "rgba(196,160,80,0.2)" : "linear-gradient(135deg, #c4a050, #8a6a20)",
                border: "none",
                borderRadius: 8,
                color: loading ? "#888" : "#000",
                padding: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                fontWeight: "bold",
                letterSpacing: "0.08em",
              }}
            >
              {loading ? t.newPassLoading : t.newPassBtn}
            </button>
          </>
        )}

        <div style={{ color: "rgba(96,165,250,0.2)", fontSize: 10, marginTop: 24, letterSpacing: "0.1em" }}>
          {t.footer}
        </div>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "rgba(96,165,250,0.3)",
              fontSize: 10,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              marginTop: 12,
              letterSpacing: "0.08em",
            }}
          >
            {t.backToSite}
          </button>
        )}
      </div>
    </div>
  );
}

const fmt = (n, d = 2) =>
  n == null ? "—" : n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Math.round(n).toLocaleString("pt-BR");
const fmtUSD = (n) => (n < 0 ? `-$${fmt(Math.abs(n), 3)}` : `$${fmt(n, 3)}`);
const green = "#4ade80",
  red = "#f87171",
  gold = "#c4a050",
  blue = "#60a5fa",
  dim = "#8fa0b8",
  purple = "#a78bfa",
  orange = "#fb923c";
const pc = (v) => (v > 0 ? green : v < 0 ? red : "#e0eaf8");

// Aether Blue palette
const BG_DEEP = "#050810";
const BG_SURFACE = "#080f1e";
const BG_CARD = "#0d1525";
const BG_ACCENT = "#1e3a5f";
const TEXT_PRIM = "#e0eaf8";
const TEXT_DIM = "#8fa0b8";

// ── CRAFTING DATABASE ─────────────────────────────────────────────────────
// ── CRAFTING DATABASE ─────────────────────────────────────────────────────
// materiais: [{ nome, qtd, isGemstone? }]
// subcategoria: para agrupamento visual na tabela
const GEMSTONE_NAMES = ["Amethyst", "Topaz", "Emerald", "Ruby", "Sapphire", "Citrine"];

const CRAFTING_DB = {
  Blacksmithing: [
    // ── Ingots ──────────────────────────────────────────────────────────────
    {
      nome: "Copper Ingot",
      nivel: 1,
      baseTax: 29,
      exp: 120,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [{ nome: "Copper Ore", qtd: 5 }],
    },
    {
      nome: "Bronze Ingot",
      nivel: 10,
      baseTax: 40,
      exp: 165,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Copper Ore", qtd: 2 },
        { nome: "Tin Ore", qtd: 3 },
      ],
    },
    {
      nome: "Iron Ingot",
      nivel: 20,
      baseTax: 48,
      exp: 200,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [{ nome: "Iron Ore", qtd: 5 }],
    },
    {
      nome: "Steel Ingot",
      nivel: 30,
      baseTax: 69,
      exp: 287,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Iron Ore", qtd: 5 },
        { nome: "Coal", qtd: 2 },
      ],
    },
    {
      nome: "Cobalt Ingot",
      nivel: 50,
      baseTax: 99,
      exp: 412,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Cobalt Ore", qtd: 5 },
        { nome: "Coal", qtd: 3 },
      ],
    },
    {
      nome: "Titanium Ingot",
      nivel: 70,
      baseTax: 156,
      exp: 650,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Titanium Ore", qtd: 5 },
        { nome: "Coal", qtd: 4 },
      ],
    },
    {
      nome: "Glimmery Ingot",
      nivel: 88,
      baseTax: 480,
      exp: 2000,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Titanium Ingot", qtd: 6 },
        { nome: "Cobalt Ingot", qtd: 4 },
        { nome: "Binding Aether", qtd: 1 },
      ],
    },
    {
      nome: "Radiant Ingot",
      nivel: 98,
      baseTax: 660,
      exp: 2750,
      qty: 1,
      subcategoria: "Ingots",
      materiais: [
        { nome: "Titanium Ingot", qtd: 5 },
        { nome: "Cobalt Ingot", qtd: 12 },
        { nome: "Radiant Catalyst", qtd: 2 },
      ],
    },
    // ── Whetstones ──────────────────────────────────────────────────────────
    {
      nome: "Whetstone",
      nivel: 3,
      baseTax: 36,
      exp: 150,
      qty: 5,
      subcategoria: "Whetstones",
      materiais: [{ nome: "Stone", qtd: 10 }],
    },
    {
      nome: "Coarse Whetstone",
      nivel: 18,
      baseTax: 102,
      exp: 425,
      qty: 5,
      subcategoria: "Whetstones",
      materiais: [
        { nome: "Stone", qtd: 15 },
        { nome: "Coal", qtd: 4 },
      ],
    },
    {
      nome: "Heavy Whetstone",
      nivel: 33,
      baseTax: 207,
      exp: 862,
      qty: 5,
      subcategoria: "Whetstones",
      materiais: [
        { nome: "Stone Block", qtd: 5 },
        { nome: "Coal", qtd: 6 },
      ],
    },
    {
      nome: "Solid Whetstone",
      nivel: 48,
      baseTax: 539,
      exp: 2243,
      qty: 5,
      subcategoria: "Whetstones",
      materiais: [
        { nome: "Stone Block", qtd: 10 },
        { nome: "Coal", qtd: 8 },
        { nome: "Gemstone Dust", qtd: 1 },
      ],
    },
    {
      nome: "Dense Whetstone",
      nivel: 70,
      baseTax: 845,
      exp: 3518,
      qty: 5,
      subcategoria: "Whetstones",
      materiais: [
        { nome: "Dense Block", qtd: 5 },
        { nome: "Coal", qtd: 8 },
        { nome: "Gemstone Dust", qtd: 2 },
      ],
    },
    // ── Blocks ──────────────────────────────────────────────────────────────
    {
      nome: "Stone Block",
      nivel: 10,
      baseTax: 24,
      exp: 100,
      qty: 1,
      subcategoria: "Blocks",
      materiais: [{ nome: "Stone", qtd: 20 }],
    },
    {
      nome: "Dense Block",
      nivel: 30,
      baseTax: 56,
      exp: 230,
      qty: 1,
      subcategoria: "Blocks",
      materiais: [
        { nome: "Stone", qtd: 40 },
        { nome: "Coal", qtd: 2 },
      ],
    },
    // ── Components ──────────────────────────────────────────────────────────
    {
      nome: "Nail",
      nivel: 2,
      baseTax: 10,
      exp: 40,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Copper Ingot", qtd: 1 }],
    },
    {
      nome: "Malleable Screw",
      nivel: 20,
      baseTax: 14,
      exp: 55,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Bronze Ingot", qtd: 1 }],
    },
    {
      nome: "Iron Bar",
      nivel: 20,
      baseTax: 48,
      exp: 200,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Iron Ingot", qtd: 1 }],
    },
    {
      nome: "Bolt",
      nivel: 30,
      baseTax: 24,
      exp: 97,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Steel Ingot", qtd: 1 }],
    },
    {
      nome: "Steel Bar",
      nivel: 45,
      baseTax: 45,
      exp: 187,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Steel Ingot", qtd: 2 }],
    },
    {
      nome: "Arcane Reflector",
      nivel: 10,
      baseTax: 66,
      exp: 275,
      qty: 1,
      subcategoria: "Components",
      materiais: [{ nome: "Bronze Ingot", qtd: 5 }],
    },
    {
      nome: "Common Plate",
      nivel: 4,
      baseTax: 300,
      exp: 1250,
      qty: 1,
      subcategoria: "Components",
      materiais: [
        { nome: "Copper Ingot", qtd: 10 },
        { nome: "Rough Plank", qtd: 10 },
        { nome: "Nail", qtd: 10 },
      ],
    },
    {
      nome: "Reinforced Plate",
      nivel: 20,
      baseTax: 765,
      exp: 3187,
      qty: 2,
      subcategoria: "Components",
      materiais: [
        { nome: "Iron Ingot", qtd: 15 },
        { nome: "Refined Plank", qtd: 15 },
        { nome: "Malleable Screw", qtd: 10 },
      ],
    },
    {
      nome: "Basic Field Tools",
      nivel: 50,
      baseTax: 480,
      exp: 2000,
      qty: 3,
      subcategoria: "Components",
      materiais: [{ nome: "Bronze Ingot", qtd: 15 }],
    },
    // ── Special ─────────────────────────────────────────────────────────────
    {
      nome: "Gemstone Dust",
      nivel: 10,
      baseTax: 240,
      exp: 10000,
      qty: 1,
      subcategoria: "Special",
      materiais: [{ nome: "Cheap Gemstone", qtd: 1, isGemstone: true }],
    },
  ],

  Cooking: [
    // ── Ingredientes ────────────────────────────────────────────────────────
    {
      nome: "Oil",
      nivel: 1,
      baseTax: 32,
      exp: 131,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Corn", qtd: 6 }],
    },
    {
      nome: "Fermented Potato Pulp",
      nivel: 1,
      baseTax: 33,
      exp: 137,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Potato", qtd: 32 }],
    },
    {
      nome: "Basic Seasoning",
      nivel: 5,
      baseTax: 52,
      exp: 215,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Salt", qtd: 1 },
        { nome: "Chicken", qtd: 2 },
      ],
    },
    {
      nome: "Seafood Seasoning",
      nivel: 5,
      baseTax: 36,
      exp: 150,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Salt", qtd: 1 },
        { nome: "Orange Scales", qtd: 5 },
      ],
    },
    {
      nome: "Ground Flour (Corn)",
      nivel: 10,
      baseTax: 216,
      exp: 900,
      qty: 20,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Corn", qtd: 42 }],
    },
    {
      nome: "Ground Flour (Wheat)",
      nivel: 10,
      baseTax: 108,
      exp: 450,
      qty: 10,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Wheat", qtd: 38 }],
    },
    {
      nome: "Collagen",
      nivel: 11,
      baseTax: 141,
      exp: 587,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Shank", qtd: 10 }],
    },
    {
      nome: "Butter",
      nivel: 15,
      baseTax: 128,
      exp: 531,
      qty: 2,
      subcategoria: "Ingredientes",
      materiais: [{ nome: "Milk", qtd: 14 }],
    },
    {
      nome: "Brewer Yeast",
      nivel: 20,
      baseTax: 150,
      exp: 625,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Orange Scales", qtd: 20 },
        { nome: "Wheat", qtd: 28 },
      ],
    },
    {
      nome: "Gourmet Seasoning",
      nivel: 25,
      baseTax: 180,
      exp: 750,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Salt", qtd: 8 },
        { nome: "Onion", qtd: 8 },
      ],
    },
    {
      nome: "Fermented Corn Pulp",
      nivel: 35,
      baseTax: 195,
      exp: 812,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Corn", qtd: 28 },
        { nome: "Fish Roe", qtd: 9 },
      ],
    },
    {
      nome: "Concentrated Collagen",
      nivel: 39,
      baseTax: 411,
      exp: 1712,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Collagen", qtd: 10 },
        { nome: "Shank", qtd: 16 },
      ],
    },
    {
      nome: "Rich Flour",
      nivel: 45,
      baseTax: 720,
      exp: 3000,
      qty: 20,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 10 },
        { nome: "Three-Leaf-Clover", qtd: 6 },
      ],
    },
    {
      nome: "Spiced Oil",
      nivel: 62,
      baseTax: 1128,
      exp: 4700,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Oil", qtd: 6 },
        { nome: "Pepper", qtd: 12 },
        { nome: "Three-Leaf-Clover", qtd: 4 },
      ],
    },
    {
      nome: "Spicy Seasoning",
      nivel: 65,
      baseTax: 1050,
      exp: 4375,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Salt", qtd: 8 },
        { nome: "Pepper", qtd: 20 },
        { nome: "Three-Leaf-Clover", qtd: 8 },
      ],
    },
    {
      nome: "Fermented Wheat Pulp",
      nivel: 65,
      baseTax: 411,
      exp: 1712,
      qty: 1,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Wheat", qtd: 70 },
        { nome: "Fish Oil", qtd: 25 },
      ],
    },
    {
      nome: "Herbal Alcohol",
      nivel: 75,
      baseTax: 1200,
      exp: 5000,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Foreign Alcohol", qtd: 4 },
        { nome: "Three-Leaf-Clover", qtd: 8 },
      ],
    },
    {
      nome: "Puff Pastry",
      nivel: 75,
      baseTax: 1200,
      exp: 5000,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Rich Flour", qtd: 70 },
        { nome: "Butter", qtd: 10 },
        { nome: "Cheese", qtd: 4 },
      ],
    },
    {
      nome: "Vegetable Broth",
      nivel: 75,
      baseTax: 1200,
      exp: 5000,
      qty: 5,
      subcategoria: "Ingredientes",
      materiais: [
        { nome: "Onion", qtd: 20 },
        { nome: "Bean", qtd: 20 },
        { nome: "Spiced Oil", qtd: 3 },
      ],
    },
    // ── Bebidas ─────────────────────────────────────────────────────────────
    {
      nome: "Vodka",
      nivel: 1,
      baseTax: 30,
      exp: 125,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [{ nome: "Potato", qtd: 10 }],
    },
    {
      nome: "Beer",
      nivel: 5,
      baseTax: 69,
      exp: 287,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [{ nome: "Wheat", qtd: 8 }],
    },
    {
      nome: "Landing Brandy",
      nivel: 10,
      baseTax: 113,
      exp: 468,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [{ nome: "Apple", qtd: 2 }],
    },
    {
      nome: "Apple Cider",
      nivel: 17,
      baseTax: 150,
      exp: 625,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Apple", qtd: 2 },
        { nome: "Wheat", qtd: 4 },
      ],
    },
    {
      nome: "Wine",
      nivel: 20,
      baseTax: 180,
      exp: 750,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Grape", qtd: 8 },
        { nome: "Brewer Yeast", qtd: 2 },
      ],
    },
    {
      nome: "Whisky",
      nivel: 22,
      baseTax: 219,
      exp: 912,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Corn", qtd: 12 },
        { nome: "Brewer Yeast", qtd: 1 },
      ],
    },
    {
      nome: "Orange Liqueur",
      nivel: 30,
      baseTax: 450,
      exp: 1875,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Orange", qtd: 4 },
        { nome: "Brewer Yeast", qtd: 1 },
      ],
    },
    {
      nome: "Rum",
      nivel: 32,
      baseTax: 399,
      exp: 1662,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Apple", qtd: 6 },
        { nome: "Brewer Yeast", qtd: 2 },
      ],
    },
    {
      nome: "Blueberry Wine",
      nivel: 40,
      baseTax: 578,
      exp: 2406,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Grape", qtd: 20 },
        { nome: "Blueberry", qtd: 40 },
        { nome: "Brewer Yeast", qtd: 2 },
      ],
    },
    {
      nome: "Boozemelon",
      nivel: 42,
      baseTax: 612,
      exp: 2550,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Watermelon", qtd: 6 },
        { nome: "Pumpkin", qtd: 2 },
        { nome: "Brewer Yeast", qtd: 3 },
      ],
    },
    {
      nome: "Spiced Rum",
      nivel: 55,
      baseTax: 936,
      exp: 3900,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Apple", qtd: 12 },
        { nome: "Pepper", qtd: 12 },
        { nome: "Brewer Yeast", qtd: 2 },
      ],
    },
    {
      nome: "Banana Vodka",
      nivel: 57,
      baseTax: 981,
      exp: 4087,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Potato", qtd: 50 },
        { nome: "Banana", qtd: 10 },
        { nome: "Brewer Yeast", qtd: 2 },
      ],
    },
    {
      nome: "Eclipse",
      nivel: 70,
      baseTax: 1680,
      exp: 7000,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Moonberry", qtd: 26 },
        { nome: "Sunberry", qtd: 26 },
        { nome: "Brewer Yeast", qtd: 4 },
      ],
    },
    {
      nome: "Strawberry Whisky",
      nivel: 72,
      baseTax: 1890,
      exp: 7875,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Corn", qtd: 48 },
        { nome: "Strawberry", qtd: 70 },
        { nome: "Brewer Yeast", qtd: 7 },
        { nome: "Honey", qtd: 20 },
      ],
    },
    {
      nome: "Fermented Liquor",
      nivel: 78,
      baseTax: 2160,
      exp: 9000,
      qty: 5,
      subcategoria: "Bebidas",
      materiais: [
        { nome: "Herbal Alcohol", qtd: 1 },
        { nome: "Watermelon", qtd: 10 },
        { nome: "Brewer Yeast", qtd: 5 },
      ],
    },
    // ── Assados ─────────────────────────────────────────────────────────────
    {
      nome: "Baked Potatoes",
      nivel: 2,
      baseTax: 42,
      exp: 175,
      qty: 5,
      subcategoria: "Assados",
      materiais: [{ nome: "Potato", qtd: 14 }],
    },
    {
      nome: "Corn on a Cob",
      nivel: 3,
      baseTax: 60,
      exp: 250,
      qty: 5,
      subcategoria: "Assados",
      materiais: [{ nome: "Corn", qtd: 4 }],
    },
    {
      nome: "Potato Bread",
      nivel: 4,
      baseTax: 68,
      exp: 281,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Potato", qtd: 12 },
        { nome: "Corn", qtd: 2 },
      ],
    },
    {
      nome: "Sajecho Hardtack",
      nivel: 13,
      baseTax: 96,
      exp: 400,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 6 },
        { nome: "Orange Scales", qtd: 3 },
      ],
    },
    {
      nome: "Rohna Crackers",
      nivel: 14,
      baseTax: 129,
      exp: 537,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 6 },
        { nome: "Butter", qtd: 1 },
      ],
    },
    {
      nome: "Glademire Crackers",
      nivel: 15,
      baseTax: 128,
      exp: 531,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 9 },
        { nome: "Basic Seasoning", qtd: 3 },
      ],
    },
    {
      nome: "Bun",
      nivel: 20,
      baseTax: 204,
      exp: 850,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 8 },
        { nome: "Basic Seasoning", qtd: 1 },
        { nome: "Milk", qtd: 4 },
      ],
    },
    {
      nome: "Loaf Bread",
      nivel: 21,
      baseTax: 216,
      exp: 900,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 13 },
        { nome: "Basic Seasoning", qtd: 2 },
        { nome: "Milk", qtd: 2 },
      ],
    },
    {
      nome: "Cookies",
      nivel: 22,
      baseTax: 351,
      exp: 1462,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 8 },
        { nome: "Basic Seasoning", qtd: 1 },
        { nome: "Butter", qtd: 4 },
      ],
    },
    {
      nome: "Scone",
      nivel: 25,
      baseTax: 324,
      exp: 1350,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 4 },
        { nome: "Milk", qtd: 10 },
        { nome: "Basic Seasoning", qtd: 1 },
      ],
    },
    {
      nome: "Cornbread",
      nivel: 26,
      baseTax: 360,
      exp: 1500,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 15 },
        { nome: "Corn", qtd: 12 },
        { nome: "Basic Seasoning", qtd: 1 },
      ],
    },
    {
      nome: "Deluxe Cookies",
      nivel: 27,
      baseTax: 309,
      exp: 1287,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 12 },
        { nome: "Butter", qtd: 2 },
        { nome: "Salt", qtd: 1 },
      ],
    },
    {
      nome: "Muffin",
      nivel: 35,
      baseTax: 473,
      exp: 1968,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 10 },
        { nome: "Milk", qtd: 4 },
        { nome: "Honey", qtd: 12 },
      ],
    },
    {
      nome: "Bagel",
      nivel: 36,
      baseTax: 410,
      exp: 1706,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 12 },
        { nome: "Egg", qtd: 4 },
        { nome: "Basic Seasoning", qtd: 3 },
      ],
    },
    {
      nome: "Cake",
      nivel: 37,
      baseTax: 540,
      exp: 2250,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Ground Flour (Corn)", qtd: 14 },
        { nome: "Milk", qtd: 10 },
        { nome: "Egg", qtd: 9 },
      ],
    },
    {
      nome: "Croissant",
      nivel: 50,
      baseTax: 798,
      exp: 3325,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 8 },
        { nome: "Butter", qtd: 6 },
        { nome: "Honey", qtd: 6 },
      ],
    },
    {
      nome: "Sourdough Bagel",
      nivel: 51,
      baseTax: 813,
      exp: 3387,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 13 },
        { nome: "Milk", qtd: 10 },
        { nome: "Gourmet Seasoning", qtd: 2 },
      ],
    },
    {
      nome: "Deluxe Cake",
      nivel: 52,
      baseTax: 918,
      exp: 3825,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 15 },
        { nome: "Milk", qtd: 8 },
        { nome: "Egg", qtd: 8 },
        { nome: "Honey", qtd: 2 },
      ],
    },
    {
      nome: "Danish",
      nivel: 70,
      baseTax: 1668,
      exp: 6950,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 16 },
        { nome: "Butter", qtd: 10 },
        { nome: "Honey", qtd: 16 },
        { nome: "Strawberry", qtd: 16 },
      ],
    },
    {
      nome: "Rye Bread",
      nivel: 71,
      baseTax: 1785,
      exp: 7437,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 14 },
        { nome: "Butter", qtd: 6 },
        { nome: "Egg", qtd: 20 },
        { nome: "Pea", qtd: 50 },
      ],
    },
    {
      nome: "Pie",
      nivel: 72,
      baseTax: 1932,
      exp: 8050,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Rich Flour", qtd: 12 },
        { nome: "Butter", qtd: 12 },
        { nome: "Egg", qtd: 4 },
        { nome: "Sunberry", qtd: 20 },
      ],
    },
    {
      nome: "Sunshine Muffin",
      nivel: 77,
      baseTax: 2940,
      exp: 12250,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Sunberry", qtd: 16 },
      ],
    },
    {
      nome: "Luxury Pie",
      nivel: 79,
      baseTax: 2940,
      exp: 12250,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Cherry", qtd: 8 },
      ],
    },
    {
      nome: "Posh Croissant",
      nivel: 80,
      baseTax: 2880,
      exp: 12000,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Acorn", qtd: 4 },
      ],
    },
    {
      nome: "Softcrust Bun",
      nivel: 82,
      baseTax: 3090,
      exp: 12875,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Milk", qtd: 16 },
        { nome: "Honey", qtd: 12 },
      ],
    },
    {
      nome: "Caramel Biscuit",
      nivel: 84,
      baseTax: 3090,
      exp: 12875,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Honey", qtd: 16 },
        { nome: "Milk", qtd: 12 },
      ],
    },
    {
      nome: "Peacemaker Bread",
      nivel: 85,
      baseTax: 2949,
      exp: 12287,
      qty: 5,
      subcategoria: "Assados",
      materiais: [
        { nome: "Puff Pastry", qtd: 2 },
        { nome: "Banana", qtd: 4 },
        { nome: "Acorn", qtd: 2 },
      ],
    },
    // ── Refeições ────────────────────────────────────────────────────────────
    {
      nome: "Apple Puree",
      nivel: 8,
      baseTax: 113,
      exp: 468,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [{ nome: "Apple", qtd: 2 }],
    },
    {
      nome: "Mashed Potatoes",
      nivel: 8,
      baseTax: 92,
      exp: 381,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Potato", qtd: 20 },
        { nome: "Basic Seasoning", qtd: 3 },
      ],
    },
    {
      nome: "Corn Chowder",
      nivel: 8,
      baseTax: 99,
      exp: 412,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Corn", qtd: 6 },
        { nome: "Potato", qtd: 2 },
      ],
    },
    {
      nome: "Scrambled Eggs",
      nivel: 8,
      baseTax: 92,
      exp: 400,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Egg", qtd: 6 },
        { nome: "Basic Seasoning", qtd: 1 },
      ],
    },
    {
      nome: "Lyderian Fries",
      nivel: 18,
      baseTax: 174,
      exp: 725,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Potato", qtd: 26 },
        { nome: "Oil", qtd: 3 },
      ],
    },
    {
      nome: "Silky Scrambled Eggs",
      nivel: 18,
      baseTax: 179,
      exp: 743,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Egg", qtd: 8 },
        { nome: "Butter", qtd: 1 },
      ],
    },
    {
      nome: "Omelet",
      nivel: 18,
      baseTax: 177,
      exp: 737,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Egg", qtd: 4 },
        { nome: "Milk", qtd: 4 },
        { nome: "Basic Seasoning", qtd: 1 },
      ],
    },
    {
      nome: "Carrot Soup",
      nivel: 18,
      baseTax: 186,
      exp: 775,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Carrot", qtd: 12 },
        { nome: "Potato", qtd: 4 },
        { nome: "Chicken", qtd: 2 },
      ],
    },
    {
      nome: "Steamed Carrots",
      nivel: 18,
      baseTax: 162,
      exp: 675,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Carrot", qtd: 20 },
        { nome: "Basic Seasoning", qtd: 4 },
      ],
    },
    {
      nome: "Fruit Pancakes",
      nivel: 20,
      baseTax: 224,
      exp: 931,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Milk", qtd: 2 },
        { nome: "Egg", qtd: 4 },
        { nome: "Ground Flour (Corn)", qtd: 4 },
        { nome: "Grape", qtd: 4 },
      ],
    },
    {
      nome: "Smoked Sausage",
      nivel: 21,
      baseTax: 206,
      exp: 856,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Shank", qtd: 2 },
        { nome: "Basic Seasoning", qtd: 3 },
      ],
    },
    {
      nome: "Charred Meat Kebab",
      nivel: 22,
      baseTax: 240,
      exp: 1000,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Beef", qtd: 4 },
        { nome: "Carrot", qtd: 6 },
        { nome: "Cabbage", qtd: 2 },
      ],
    },
    {
      nome: "Roasted Chicken and Veggies",
      nivel: 23,
      baseTax: 288,
      exp: 1200,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Chicken", qtd: 2 },
        { nome: "Carrot", qtd: 2 },
        { nome: "Cheese", qtd: 2 },
      ],
    },
    {
      nome: "Ravendawian Porridge",
      nivel: 24,
      baseTax: 309,
      exp: 1287,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Wheat", qtd: 10 },
        { nome: "Apple", qtd: 2 },
        { nome: "Milk", qtd: 4 },
      ],
    },
    {
      nome: "Rum Dowslider",
      nivel: 35,
      baseTax: 288,
      exp: 1200,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Fish Roe", qtd: 10 },
        { nome: "Cabbage", qtd: 8 },
        { nome: "Basic Seasoning", qtd: 5 },
      ],
    },
    {
      nome: "Shaked Fruitmilk",
      nivel: 36,
      baseTax: 501,
      exp: 2087,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Milk", qtd: 12 },
        { nome: "Strawberry", qtd: 6 },
        { nome: "Blueberry", qtd: 30 },
      ],
    },
    {
      nome: "Settler's Stew",
      nivel: 37,
      baseTax: 552,
      exp: 2175,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Potato", qtd: 20 },
        { nome: "Bean", qtd: 40 },
        { nome: "Basic Seasoning", qtd: 4 },
      ],
    },
    {
      nome: "Dwarven Purple Shank",
      nivel: 38,
      baseTax: 594,
      exp: 2475,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Shank", qtd: 6 },
        { nome: "Grape", qtd: 4 },
        { nome: "Watermelon", qtd: 4 },
      ],
    },
    {
      nome: "Fillet Lucien",
      nivel: 39,
      baseTax: 606,
      exp: 2525,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Beef", qtd: 10 },
        { nome: "Ground Flour (Corn)", qtd: 3 },
        { nome: "Egg", qtd: 2 },
        { nome: "Pumpkin", qtd: 2 },
      ],
    },
    {
      nome: "Blueberry Pie",
      nivel: 50,
      baseTax: 792,
      exp: 3300,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Butter", qtd: 5 },
        { nome: "Rich Flour", qtd: 5 },
        { nome: "Blueberry", qtd: 68 },
      ],
    },
    {
      nome: "Frozen Sweet Berries",
      nivel: 51,
      baseTax: 864,
      exp: 3600,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Blueberry", qtd: 24 },
        { nome: "Cherry", qtd: 8 },
        { nome: "Moonberry", qtd: 8 },
      ],
    },
    {
      nome: "Lucien's Waffles",
      nivel: 52,
      baseTax: 893,
      exp: 3718,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Corn", qtd: 12 },
        { nome: "Egg", qtd: 16 },
        { nome: "Rich Flour", qtd: 10 },
        { nome: "Strawberry", qtd: 16 },
      ],
    },
    {
      nome: "Acornchar Sausage",
      nivel: 53,
      baseTax: 798,
      exp: 3325,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Shank", qtd: 10 },
        { nome: "Gourmet Seasoning", qtd: 4 },
        { nome: "Acorn", qtd: 2 },
      ],
    },
    {
      nome: "Freshfish Roll",
      nivel: 54,
      baseTax: 642,
      exp: 2675,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Red Fish Roe", qtd: 14 },
        { nome: "Cheese", qtd: 4 },
        { nome: "Gourmet Seasoning", qtd: 2 },
      ],
    },
    {
      nome: "Sweetened Beans",
      nivel: 65,
      baseTax: 1230,
      exp: 5125,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Bean", qtd: 36 },
        { nome: "Apple", qtd: 10 },
        { nome: "Banana", qtd: 4 },
      ],
    },
    {
      nome: "Firered Chicken Kebab",
      nivel: 66,
      baseTax: 1293,
      exp: 5387,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Chicken", qtd: 16 },
        { nome: "Garlic", qtd: 4 },
        { nome: "Orange", qtd: 2 },
        { nome: "Spicy Seasoning", qtd: 1 },
      ],
    },
    {
      nome: "Lyderian Chopped Tenderloin",
      nivel: 67,
      baseTax: 1335,
      exp: 5562,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Beef", qtd: 16 },
        { nome: "Garlic", qtd: 15 },
        { nome: "Spicy Seasoning", qtd: 2 },
      ],
    },
    {
      nome: "Rohna Roasted Ham",
      nivel: 68,
      baseTax: 1440,
      exp: 6000,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Shank", qtd: 20 },
        { nome: "Spicy Seasoning", qtd: 2 },
      ],
    },
    {
      nome: "Sailor's Seastew",
      nivel: 69,
      baseTax: 1241,
      exp: 5168,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Black Fish Roe", qtd: 10 },
        { nome: "Broccoli", qtd: 20 },
        { nome: "Pea", qtd: 32 },
      ],
    },
    {
      nome: "Bittersweet Roast",
      nivel: 70,
      baseTax: 1710,
      exp: 7125,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Beef", qtd: 20 },
        { nome: "Broccoli", qtd: 6 },
        { nome: "Cherry", qtd: 10 },
      ],
    },
    {
      nome: "Shanks N' Mash",
      nivel: 75,
      baseTax: 2136,
      exp: 8900,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Shank", qtd: 30 },
        { nome: "Garlic", qtd: 30 },
        { nome: "Milk", qtd: 16 },
      ],
    },
    {
      nome: "Iced Fruitmilk",
      nivel: 75,
      baseTax: 2100,
      exp: 8750,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Milk", qtd: 20 },
        { nome: "Orange", qtd: 10 },
        { nome: "Sunberry", qtd: 10 },
        { nome: "Moonberry", qtd: 6 },
      ],
    },
    {
      nome: "Exotic Stew",
      nivel: 81,
      baseTax: 8070,
      exp: 33625,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Vegetable Broth", qtd: 2 },
        { nome: "Basic Seasoning", qtd: 5 },
        { nome: "Spiced Oil", qtd: 5 },
        { nome: "Exotic Fin", qtd: 4 },
      ],
    },
    {
      nome: "Squidink",
      nivel: 86,
      baseTax: 3000,
      exp: 12500,
      qty: 5,
      subcategoria: "Refeições",
      materiais: [
        { nome: "Vegetable Broth", qtd: 2 },
        { nome: "Basic Seasoning", qtd: 5 },
        { nome: "Black Fish Roe", qtd: 3 },
        { nome: "Ink Sack", qtd: 3 },
      ],
    },
    // ── Iscas de Pesca ───────────────────────────────────────────────────────
    {
      nome: "Gummy Wriggler",
      nivel: 12,
      baseTax: 153,
      exp: 637,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 1 },
        { nome: "Carrot", qtd: 2 },
      ],
    },
    {
      nome: "Shrimp Bait",
      nivel: 13,
      baseTax: 141,
      exp: 587,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 1 },
        { nome: "Exotic Fin", qtd: 3 },
      ],
    },
    {
      nome: "Catfish Bait",
      nivel: 18,
      baseTax: 180,
      exp: 750,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 1 },
        { nome: "Jellyfish Remains", qtd: 3 },
      ],
    },
    {
      nome: "Gelatinous Pupa",
      nivel: 23,
      baseTax: 492,
      exp: 2050,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 2 },
        { nome: "Orange", qtd: 2 },
      ],
    },
    {
      nome: "Tench Fish Bait",
      nivel: 23,
      baseTax: 282,
      exp: 1175,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 2 },
        { nome: "Exotic Fin", qtd: 5 },
      ],
    },
    {
      nome: "Rainbow Fish Bait",
      nivel: 28,
      baseTax: 336,
      exp: 1400,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 2 },
        { nome: "Stolen Spices", qtd: 3 },
      ],
    },
    {
      nome: "Scale Fish Bait",
      nivel: 32,
      baseTax: 423,
      exp: 1762,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 3 },
        { nome: "Caudal Fin", qtd: 3 },
      ],
    },
    {
      nome: "Princess Fish Bait",
      nivel: 37,
      baseTax: 480,
      exp: 2000,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 3 },
        { nome: "Narwhal Blubber", qtd: 3 },
      ],
    },
    {
      nome: "Plump Jellygrub",
      nivel: 40,
      baseTax: 731,
      exp: 3043,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Collagen", qtd: 3 },
        { nome: "Banana", qtd: 4 },
      ],
    },
    {
      nome: "Sky Fish Bait",
      nivel: 47,
      baseTax: 570,
      exp: 2375,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 1 },
        { nome: "Ink Sack", qtd: 3 },
      ],
    },
    {
      nome: "Star Fish Bait",
      nivel: 57,
      baseTax: 630,
      exp: 2625,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 1 },
        { nome: "Foreign Alcohol", qtd: 3 },
      ],
    },
    {
      nome: "Blobby Beetle",
      nivel: 61,
      baseTax: 984,
      exp: 4100,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 1 },
        { nome: "Moonberry", qtd: 22 },
      ],
    },
    {
      nome: "Rainbow Flounder Bait",
      nivel: 67,
      baseTax: 750,
      exp: 3125,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 2 },
        { nome: "Seahunter Eye", qtd: 3 },
      ],
    },
    {
      nome: "Chewy Jellyworm",
      nivel: 75,
      baseTax: 1050,
      exp: 4375,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 2 },
        { nome: "Sunberry", qtd: 10 },
      ],
    },
    {
      nome: "Tiger Shark Bait",
      nivel: 77,
      baseTax: 1080,
      exp: 4500,
      qty: 50,
      subcategoria: "Iscas",
      materiais: [
        { nome: "Concentrated Collagen", qtd: 2 },
        { nome: "Orca Blubber", qtd: 3 },
      ],
    },
    // ── Ração Animal ─────────────────────────────────────────────────────────
    {
      nome: "Basic Animal Feed",
      nivel: 20,
      baseTax: 213,
      exp: 887,
      qty: 3,
      subcategoria: "Ração",
      materiais: [
        { nome: "Shank", qtd: 12 },
        { nome: "Cabbage", qtd: 4 },
        { nome: "Carrot", qtd: 10 },
      ],
    },
    {
      nome: "Superior Ration",
      nivel: 20,
      baseTax: 213,
      exp: 887,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Basic Animal Feed", qtd: 3 },
        { nome: "Moa Ration", qtd: 1 },
      ],
    },
    {
      nome: "Rustic Ration",
      nivel: 30,
      baseTax: 438,
      exp: 1825,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Basic Animal Feed", qtd: 5 },
        { nome: "Attachment Feather", qtd: 1 },
        { nome: "Superior Ration", qtd: 2 },
      ],
    },
    {
      nome: "Gourmet Ration",
      nivel: 40,
      baseTax: 660,
      exp: 2750,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Basic Animal Feed", qtd: 7 },
        { nome: "Moa Ration", qtd: 1 },
        { nome: "Rustic Ration", qtd: 2 },
      ],
    },
    {
      nome: "Complex Animal Feed",
      nivel: 50,
      baseTax: 552,
      exp: 2175,
      qty: 3,
      subcategoria: "Ração",
      materiais: [
        { nome: "Beef", qtd: 20 },
        { nome: "Broccoli", qtd: 10 },
        { nome: "Pea", qtd: 8 },
        { nome: "Pumpkin", qtd: 6 },
      ],
    },
    {
      nome: "Seafood Extravaganza",
      nivel: 50,
      baseTax: 786,
      exp: 3275,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Complex Animal Feed", qtd: 3 },
        { nome: "Attachment Feather", qtd: 1 },
        { nome: "Gourmet Ration", qtd: 2 },
      ],
    },
    {
      nome: "Uncanny Ration",
      nivel: 60,
      baseTax: 1185,
      exp: 4937,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Complex Animal Feed", qtd: 5 },
        { nome: "Moa Ration", qtd: 1 },
        { nome: "Seafood Extravaganza", qtd: 2 },
      ],
    },
    {
      nome: "Moa's Delight",
      nivel: 75,
      baseTax: 1692,
      exp: 7050,
      qty: 5,
      subcategoria: "Ração",
      materiais: [
        { nome: "Complex Animal Feed", qtd: 7 },
        { nome: "Attachment Feather", qtd: 2 },
        { nome: "Uncanny Ration", qtd: 2 },
      ],
    },
  ],

  Alchemy: [
    {
      nome: "Lesser Arcane Energy Tonic",
      nivel: 4,
      baseTax: 45,
      exp: 187,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Refreshing Leaf", qtd: 6 },
        { nome: "Earthy Stem", qtd: 4 },
        { nome: "Purified Alcohol", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Strengthening Tonic",
      nivel: 5,
      baseTax: 66,
      exp: 275,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Refreshing Leaf", qtd: 8 },
        { nome: "Thin Roots", qtd: 8 },
        { nome: "Purified Oil", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Enlightenment Tonic",
      nivel: 6,
      baseTax: 59,
      exp: 243,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Cerulean Cap", qtd: 6 },
        { nome: "Refreshing Leaf", qtd: 6 },
        { nome: "Purified Alcohol", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Rejuvenation Tonic",
      nivel: 7,
      baseTax: 90,
      exp: 375,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Toadchew", qtd: 8 },
        { nome: "Fungal Dust", qtd: 12 },
        { nome: "Purified Oil", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Wellspring Tonic",
      nivel: 8,
      baseTax: 68,
      exp: 281,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Cerulean Cap", qtd: 8 },
        { nome: "Fungal Dust", qtd: 6 },
        { nome: "Purified Alcohol", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Mountainheart Tonic",
      nivel: 9,
      baseTax: 105,
      exp: 437,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Pirate's Bliss", qtd: 8 },
        { nome: "Refreshing Leaf", qtd: 6 },
        { nome: "Purified Oil", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Arcana Tonic",
      nivel: 11,
      baseTax: 87,
      exp: 362,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Juicy Stem", qtd: 8 },
        { nome: "Emerald Spores", qtd: 6 },
        { nome: "Purified Alcohol", qtd: 1 },
      ],
    },
    {
      nome: "Lesser Champion's Tonic",
      nivel: 14,
      baseTax: 122,
      exp: 506,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Brightday", qtd: 8 },
        { nome: "Shimmering Spores", qtd: 10 },
        { nome: "Purified Oil", qtd: 1 },
      ],
    },
    {
      nome: "Arcane Energy Tonic",
      nivel: 16,
      baseTax: 150,
      exp: 625,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Arcane Energy Tonic", qtd: 1 },
        { nome: "Emerald Spores", qtd: 14 },
        { nome: "Earthy Stem", qtd: 14 },
        { nome: "Acid", qtd: 1 },
      ],
    },
    {
      nome: "Strengthening Tonic",
      nivel: 17,
      baseTax: 150,
      exp: 625,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Strengthening Tonic", qtd: 1 },
        { nome: "Shimmering Spores", qtd: 14 },
        { nome: "Earthy Stem", qtd: 12 },
        { nome: "Alkali", qtd: 1 },
      ],
    },
    {
      nome: "Enlightenment Tonic",
      nivel: 19,
      baseTax: 168,
      exp: 700,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Enlightenment Tonic", qtd: 1 },
        { nome: "Bloody Bud", qtd: 8 },
        { nome: "Thorny Roots", qtd: 8 },
        { nome: "Alkali", qtd: 1 },
      ],
    },
    {
      nome: "Rejuvenation Tonic",
      nivel: 21,
      baseTax: 198,
      exp: 825,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Rejuvenation Tonic", qtd: 1 },
        { nome: "Juicy Roots", qtd: 16 },
        { nome: "Green Cap", qtd: 12 },
        { nome: "Alkali", qtd: 1 },
      ],
    },
    {
      nome: "Wellspring Tonic",
      nivel: 22,
      baseTax: 203,
      exp: 843,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Wellspring Tonic", qtd: 1 },
        { nome: "Pirate's Cap", qtd: 14 },
        { nome: "Thin Roots", qtd: 8 },
        { nome: "Acid", qtd: 1 },
      ],
    },
    {
      nome: "Mountainheart Tonic",
      nivel: 24,
      baseTax: 213,
      exp: 887,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Mountainheart Tonic", qtd: 1 },
        { nome: "Juicy Roots", qtd: 16 },
        { nome: "Emerald Spores", qtd: 14 },
        { nome: "Alkali", qtd: 1 },
      ],
    },
    {
      nome: "Arcana Tonic",
      nivel: 27,
      baseTax: 300,
      exp: 1250,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Arcana Tonic", qtd: 1 },
        { nome: "Brightday", qtd: 24 },
        { nome: "Fungal Dust", qtd: 30 },
        { nome: "Alkali", qtd: 1 },
      ],
    },
    {
      nome: "Champion's Tonic",
      nivel: 28,
      baseTax: 315,
      exp: 1312,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Lesser Champion's Tonic", qtd: 1 },
        { nome: "Toadchew", qtd: 20 },
        { nome: "Juicy Stem", qtd: 26 },
        { nome: "Acid", qtd: 1 },
      ],
    },
    {
      nome: "Mana Surge Tonic",
      nivel: 35,
      baseTax: 324,
      exp: 1350,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Wellspring Tonic", qtd: 1 },
        { nome: "Bloody Bud", qtd: 4 },
        { nome: "Dry Stem", qtd: 12 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Nimble Grace Tonic",
      nivel: 35,
      baseTax: 360,
      exp: 1500,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Champion's Tonic", qtd: 1 },
        { nome: "Bloody Bud", qtd: 4 },
        { nome: "Pirate's Bliss", qtd: 16 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Mighty Impact Tonic",
      nivel: 37,
      baseTax: 408,
      exp: 1700,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Champion's Tonic", qtd: 1 },
        { nome: "Numbing Thorns", qtd: 12 },
        { nome: "Juicy Stem", qtd: 16 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Iron Will Tonic",
      nivel: 45,
      baseTax: 414,
      exp: 1725,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Strengthening Tonic", qtd: 1 },
        { nome: "Glowing Spores", qtd: 16 },
        { nome: "Chest Warmer", qtd: 6 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Profound Insight Tonic",
      nivel: 48,
      baseTax: 609,
      exp: 2537,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Arcana Tonic", qtd: 1 },
        { nome: "Rejuvenation Tonic", qtd: 1 },
        { nome: "Lizard's Delight", qtd: 24 },
        { nome: "Chest Warmer", qtd: 14 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Light of Dawn Tonic",
      nivel: 51,
      baseTax: 567,
      exp: 2362,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Enlightenment Tonic", qtd: 1 },
        { nome: "Glowing Spores", qtd: 16 },
        { nome: "Hagthorn", qtd: 10 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Arcane Mastery Tonic",
      nivel: 55,
      baseTax: 684,
      exp: 2850,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Arcane Energy Tonic", qtd: 1 },
        { nome: "Twisted Flower", qtd: 10 },
        { nome: "Hagthorn", qtd: 16 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Dark Pact Tonic",
      nivel: 57,
      baseTax: 585,
      exp: 2437,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Light of Dawn Tonic", qtd: 1 },
        { nome: "Catalytic Solution", qtd: 6 },
        { nome: "Bloody Chalice", qtd: 20 },
        { nome: "Acid", qtd: 4 },
      ],
    },
    {
      nome: "Chillguard Tonic",
      nivel: 59,
      baseTax: 900,
      exp: 3750,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Arcane Energy Tonic", qtd: 1 },
        { nome: "Mountainheart Tonic", qtd: 1 },
        { nome: "Dusk Dust", qtd: 20 },
        { nome: "Cold Roots", qtd: 20 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Burning Aegis Tonic",
      nivel: 61,
      baseTax: 1008,
      exp: 4200,
      qty: 3,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Arcana Tonic", qtd: 1 },
        { nome: "Mountainheart Tonic", qtd: 1 },
        { nome: "Dusk Dust", qtd: 16 },
        { nome: "Fire Cap", qtd: 18 },
        { nome: "Catalytic Solution", qtd: 1 },
      ],
    },
    {
      nome: "Wealthbringer's Tonic",
      nivel: 70,
      baseTax: 1152,
      exp: 4800,
      qty: 1,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Brightday", qtd: 52 },
        { nome: "Ambar Dust", qtd: 40 },
        { nome: "Core Essence", qtd: 1 },
      ],
    },
    {
      nome: "Purifying Tonic",
      nivel: 70,
      baseTax: 720,
      exp: 3000,
      qty: 1,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Chest Warmer", qtd: 16 },
        { nome: "Pirate's Bliss", qtd: 16 },
        { nome: "Core Essence", qtd: 1 },
      ],
    },
    {
      nome: "Serendipity Draught",
      nivel: 78,
      baseTax: 2334,
      exp: 9725,
      qty: 1,
      subcategoria: "Elixir",
      materiais: [
        { nome: "Wealthbringer's Tonic", qtd: 1 },
        { nome: "Tonic of Forbidden Knowledge", qtd: 1 },
        { nome: "Mixing Agent", qtd: 2 },
      ],
    },
  ],

  Carpentry: [
    {
      nome: "Rough Plank",
      nivel: 1,
      baseTax: 53,
      exp: 220,
      qty: 1,
      subcategoria: "Planks",
      materiais: [{ nome: "Small Log", qtd: 12 }],
    },
    {
      nome: "Dense Plank",
      nivel: 10,
      baseTax: 255,
      exp: 1062,
      qty: 1,
      subcategoria: "Planks",
      materiais: [{ nome: "Dense Log", qtd: 8 }],
    },
    {
      nome: "Refined Plank",
      nivel: 10,
      baseTax: 96,
      exp: 400,
      qty: 1,
      subcategoria: "Planks",
      materiais: [{ nome: "Heavy Log", qtd: 8 }],
    },
    {
      nome: "Treated Plank",
      nivel: 25,
      baseTax: 165,
      exp: 687,
      qty: 1,
      subcategoria: "Planks",
      materiais: [
        { nome: "Heavy Log", qtd: 12 },
        { nome: "Oil", qtd: 2 },
      ],
    },
    {
      nome: "Heavy Plank",
      nivel: 30,
      baseTax: 534,
      exp: 2225,
      qty: 1,
      subcategoria: "Planks",
      materiais: [
        { nome: "Dense Log", qtd: 16 },
        { nome: "Oil", qtd: 2 },
      ],
    },
    {
      nome: "Sturdy Plank",
      nivel: 50,
      baseTax: 197,
      exp: 818,
      qty: 1,
      subcategoria: "Planks",
      materiais: [
        { nome: "Sturdy Log", qtd: 10 },
        { nome: "Oil", qtd: 4 },
      ],
    },
    {
      nome: "Fishing Rod T1",
      nivel: 5,
      baseTax: 107,
      exp: 445,
      qty: 1,
      subcategoria: "Fishing",
      materiais: [
        { nome: "Rough Plank", qtd: 3 },
        { nome: "Copper Ingot", qtd: 1 },
        { nome: "Coarse Thread", qtd: 2 },
      ],
    },
    {
      nome: "Fishing Rod T2",
      nivel: 25,
      baseTax: 197,
      exp: 820,
      qty: 1,
      subcategoria: "Fishing",
      materiais: [
        { nome: "Refined Plank", qtd: 3 },
        { nome: "Iron Ingot", qtd: 1 },
        { nome: "Linen Cloth", qtd: 2 },
      ],
    },
    {
      nome: "Fishing Rod T3",
      nivel: 45,
      baseTax: 380,
      exp: 1583,
      qty: 1,
      subcategoria: "Fishing",
      materiais: [
        { nome: "Treated Plank", qtd: 3 },
        { nome: "Steel Ingot", qtd: 1 },
        { nome: "Bolted Cloth", qtd: 2 },
      ],
    },
    {
      nome: "Short Bow",
      nivel: 10,
      baseTax: 144,
      exp: 600,
      qty: 1,
      subcategoria: "Weapons",
      materiais: [
        { nome: "Rough Plank", qtd: 4 },
        { nome: "Coarse Thread", qtd: 4 },
      ],
    },
    {
      nome: "Long Bow",
      nivel: 30,
      baseTax: 285,
      exp: 1187,
      qty: 1,
      subcategoria: "Weapons",
      materiais: [
        { nome: "Refined Plank", qtd: 4 },
        { nome: "Linen Cloth", qtd: 3 },
        { nome: "Iron Ingot", qtd: 1 },
      ],
    },
    {
      nome: "Arcane Staff",
      nivel: 30,
      baseTax: 285,
      exp: 1187,
      qty: 1,
      subcategoria: "Weapons",
      materiais: [
        { nome: "Treated Plank", qtd: 3 },
        { nome: "Linen Cloth", qtd: 2 },
        { nome: "Iron Ingot", qtd: 1 },
      ],
    },
  ],

  Weaving: [
    {
      nome: "Coarse Thread",
      nivel: 1,
      baseTax: 19,
      exp: 78,
      qty: 1,
      subcategoria: "Thread",
      materiais: [{ nome: "Cotton", qtd: 4 }],
    },
    {
      nome: "Linen Cloth",
      nivel: 1,
      baseTax: 53,
      exp: 220,
      qty: 1,
      subcategoria: "Cloth",
      materiais: [
        { nome: "Cotton", qtd: 8 },
        { nome: "Coarse Thread", qtd: 2 },
      ],
    },
    {
      nome: "Tanned Leather",
      nivel: 10,
      baseTax: 96,
      exp: 400,
      qty: 1,
      subcategoria: "Leather",
      materiais: [{ nome: "Rawhide", qtd: 6 }],
    },
    {
      nome: "Thick Leather",
      nivel: 25,
      baseTax: 165,
      exp: 687,
      qty: 1,
      subcategoria: "Leather",
      materiais: [
        { nome: "Tanned Leather", qtd: 3 },
        { nome: "Tallow", qtd: 2 },
      ],
    },
    {
      nome: "Bolted Cloth",
      nivel: 25,
      baseTax: 165,
      exp: 687,
      qty: 1,
      subcategoria: "Cloth",
      materiais: [
        { nome: "Linen Cloth", qtd: 3 },
        { nome: "Coarse Thread", qtd: 4 },
      ],
    },
    {
      nome: "Silk",
      nivel: 50,
      baseTax: 285,
      exp: 1187,
      qty: 1,
      subcategoria: "Cloth",
      materiais: [
        { nome: "Silkworm Cocoon", qtd: 8 },
        { nome: "Coarse Thread", qtd: 2 },
      ],
    },
    {
      nome: "Tanned Silk",
      nivel: 50,
      baseTax: 285,
      exp: 1187,
      qty: 1,
      subcategoria: "Cloth",
      materiais: [
        { nome: "Silk", qtd: 2 },
        { nome: "Tallow", qtd: 3 },
      ],
    },
    {
      nome: "Light Armor T2",
      nivel: 20,
      baseTax: 210,
      exp: 875,
      qty: 1,
      subcategoria: "Armors",
      materiais: [
        { nome: "Tanned Leather", qtd: 4 },
        { nome: "Linen Cloth", qtd: 3 },
        { nome: "Coarse Thread", qtd: 4 },
      ],
    },
    {
      nome: "Light Armor T3",
      nivel: 40,
      baseTax: 405,
      exp: 1687,
      qty: 1,
      subcategoria: "Armors",
      materiais: [
        { nome: "Thick Leather", qtd: 4 },
        { nome: "Bolted Cloth", qtd: 3 },
        { nome: "Linen Cloth", qtd: 2 },
      ],
    },
    {
      nome: "Moa Saddle T1",
      nivel: 10,
      baseTax: 144,
      exp: 600,
      qty: 1,
      subcategoria: "Moa",
      materiais: [
        { nome: "Tanned Leather", qtd: 5 },
        { nome: "Coarse Thread", qtd: 4 },
      ],
    },
    {
      nome: "Moa Saddle T2",
      nivel: 30,
      baseTax: 285,
      exp: 1187,
      qty: 1,
      subcategoria: "Moa",
      materiais: [
        { nome: "Thick Leather", qtd: 5 },
        { nome: "Bolted Cloth", qtd: 2 },
        { nome: "Linen Cloth", qtd: 2 },
      ],
    },
  ],
};

const PROF_ICONS = { Blacksmithing: "⚒️", Cooking: "🍳", Alchemy: "⚗️", Carpentry: "🪵", Weaving: "🧵" };

// ── Tradeposts & distância (steps) ──────────────────────────────────────
// Fonte: reportado in-game pela guild (pin icon no Munk Tradepost).
// Seabreeze↔Dras Ashar e Glaceforde↔Defiance confirmados in-game pela guild.
const TRADEPOSTS = [
  "Darzuac", "Defiance", "Dras Ashar", "Gilead", "Glaceforde",
  "Kar'ivir", "Margrove", "Orca Bay", "Ravencrest", "Riverend",
  "Seabreeze", "Tarmire",
];

const TRADEPOST_STEPS = {
  "Riverend|Margrove": 1008,
  "Riverend|Orca Bay": 1336,
  "Riverend|Seabreeze": 2228,
  "Riverend|Tarmire": 1299,
  "Riverend|Darzuac": 956,
  "Riverend|Gilead": 2316,
  "Riverend|Glaceforde": 1928,
  "Riverend|Ravencrest": 650,
  "Riverend|Defiance": 493,
  "Riverend|Dras Ashar": 1954,
  "Riverend|Kar'ivir": 1527,
  "Margrove|Orca Bay": 1205,
  "Margrove|Seabreeze": 1789,
  "Margrove|Tarmire": 1437,
  "Margrove|Darzuac": 1618,
  "Margrove|Gilead": 2185,
  "Margrove|Glaceforde": 920,
  "Margrove|Ravencrest": 603,
  "Margrove|Defiance": 1501,
  "Margrove|Dras Ashar": 2616,
  "Margrove|Kar'ivir": 2061,
  "Orca Bay|Seabreeze": 980,
  "Orca Bay|Tarmire": 1520,
  "Orca Bay|Darzuac": 1701,
  "Orca Bay|Gilead": 1068,
  "Orca Bay|Glaceforde": 1831,
  "Orca Bay|Ravencrest": 686,
  "Orca Bay|Defiance": 1829,
  "Orca Bay|Dras Ashar": 2699,
  "Orca Bay|Kar'ivir": 2724,
  "Seabreeze|Tarmire": 2412,
  "Seabreeze|Darzuac": 2593,
  "Seabreeze|Gilead": 1300,
  "Seabreeze|Glaceforde": 1511,
  "Seabreeze|Ravencrest": 1578,
  "Seabreeze|Defiance": 2721,
  "Seabreeze|Dras Ashar": 3591,
  "Seabreeze|Kar'ivir": 3616,
  "Tarmire|Darzuac": 991,
  "Tarmire|Gilead": 2500,
  "Tarmire|Glaceforde": 2201,
  "Tarmire|Ravencrest": 834,
  "Tarmire|Defiance": 1630,
  "Tarmire|Dras Ashar": 1989,
  "Tarmire|Kar'ivir": 2826,
  "Darzuac|Gilead": 2681,
  "Darzuac|Glaceforde": 2382,
  "Darzuac|Ravencrest": 1015,
  "Darzuac|Defiance": 1287,
  "Darzuac|Dras Ashar": 1233,
  "Darzuac|Kar'ivir": 2483,
  "Gilead|Glaceforde": 2151,
  "Gilead|Ravencrest": 1666,
  "Gilead|Defiance": 2809,
  "Gilead|Dras Ashar": 3679,
  "Gilead|Kar'ivir": 3704,
  "Glaceforde|Ravencrest": 1367,
  "Glaceforde|Defiance": 2421,
  "Glaceforde|Dras Ashar": 3380,
  "Glaceforde|Kar'ivir": 2981,
  "Ravencrest|Defiance": 1143,
  "Ravencrest|Dras Ashar": 2013,
  "Ravencrest|Kar'ivir": 2038,
  "Defiance|Dras Ashar": 2285,
  "Defiance|Kar'ivir": 2020,
  "Dras Ashar|Kar'ivir": 3481,
};

function getTradepostSteps(a, b) {
  if (!a || !b || a === b) return null;
  return TRADEPOST_STEPS[`${a}|${b}`] ?? TRADEPOST_STEPS[`${b}|${a}`] ?? null;
}

const PACKS = {
  "Pickled Vegetables": {
    materiais: [
      { nome: "Cabbage", qtd: 238, custoProducao: 72, precoMkt: 2100 },
      { nome: "Carrot", qtd: 300, custoProducao: 83, precoMkt: 2000 },
      { nome: "Salt", qtd: 12, custoProducao: 0, precoMkt: 4900 },
    ],
  },
  "Cavedweller Findings": {
    materiais: [
      { nome: "Cobalt Ore", qtd: 110, custoProducao: 0, precoMkt: 16000 },
      { nome: "Stone", qtd: 148, custoProducao: 0, precoMkt: 885 },
      { nome: "Glowing Spores", qtd: 120, custoProducao: 82, precoMkt: 2440 },
      { nome: "Thorny Roots", qtd: 120, custoProducao: 85, precoMkt: 85 },
    ],
  },
  "Yornish Seasoning": {
    materiais: [
      { nome: "Twisted Flower", qtd: 100, custoProducao: 0, precoMkt: 0 },
      { nome: "Withered Stem", qtd: 185, custoProducao: 0, precoMkt: 0 },
      { nome: "Fungal Dust", qtd: 500, custoProducao: 0, precoMkt: 0 },
      { nome: "Salt", qtd: 14, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Pirates Anesthesic": {
    materiais: [
      { nome: "Numbing Thorns", qtd: 245, custoProducao: 0, precoMkt: 0 },
      { nome: "Pirate's Cap", qtd: 280, custoProducao: 0, precoMkt: 0 },
      { nome: "Juice Stem", qtd: 280, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Vegetable Stew": {
    materiais: [
      { nome: "Broccoli", qtd: 55, custoProducao: 0, precoMkt: 0 },
      { nome: "Pumpkin", qtd: 55, custoProducao: 0, precoMkt: 0 },
      { nome: "Bean", qtd: 211, custoProducao: 0, precoMkt: 0 },
      { nome: "Potato", qtd: 250, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Exotic Spices": {
    materiais: [
      { nome: "Flaming Spores", qtd: 100, custoProducao: 0, precoMkt: 0 },
      { nome: "Chest Warmer", qtd: 150, custoProducao: 0, precoMkt: 0 },
      { nome: "Juicy Roots", qtd: 92, custoProducao: 0, precoMkt: 0 },
      { nome: "Sunberry", qtd: 60, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Sombershade Toppings": {
    materiais: [
      { nome: "Dread Bloom", qtd: 110, custoProducao: 0, precoMkt: 0 },
      { nome: "Dusk Dust", qtd: 170, custoProducao: 0, precoMkt: 0 },
      { nome: "Thorny Roots", qtd: 240, custoProducao: 0, precoMkt: 0 },
      { nome: "Fungal Dust", qtd: 220, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Margrove Ale Ingredients": {
    materiais: [
      { nome: "Wheat", qtd: 400, custoProducao: 0, precoMkt: 0 },
      { nome: "Acorn", qtd: 12, custoProducao: 0, precoMkt: 0 },
      { nome: "Pumpkin", qtd: 45, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Basic Rations": {
    materiais: [
      { nome: "Wheat", qtd: 316, custoProducao: 0, precoMkt: 0 },
      { nome: "Corn", qtd: 110, custoProducao: 0, precoMkt: 0 },
      { nome: "Apple", qtd: 35, custoProducao: 0, precoMkt: 0 },
      { nome: "Shank", qtd: 25, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Kabbar's Omelete": {
    materiais: [
      { nome: "Egg", qtd: 145, custoProducao: 0, precoMkt: 0 },
      { nome: "Cheese", qtd: 35, custoProducao: 0, precoMkt: 0 },
      { nome: "Pepper", qtd: 148, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Ravencrest Greens": {
    materiais: [
      { nome: "Broccoli", qtd: 128, custoProducao: 0, precoMkt: 0 },
      { nome: "Pea", qtd: 112, custoProducao: 0, precoMkt: 0 },
      { nome: "Cabbage", qtd: 160, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Fruit Basket": {
    materiais: [
      { nome: "Grape", qtd: 136, custoProducao: 0, precoMkt: 0 },
      { nome: "Watermelon", qtd: 30, custoProducao: 0, precoMkt: 0 },
      { nome: "Cherry", qtd: 45, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Crisp Produce": {
    materiais: [
      { nome: "Apple", qtd: 55, custoProducao: 0, precoMkt: 0 },
      { nome: "Broccoli", qtd: 55, custoProducao: 0, precoMkt: 0 },
      { nome: "Pea", qtd: 133, custoProducao: 0, precoMkt: 0 },
      { nome: "Bean", qtd: 133, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Sailor's Remedy": {
    materiais: [
      { nome: "Orange", qtd: 20, custoProducao: 0, precoMkt: 0 },
      { nome: "Bean", qtd: 155, custoProducao: 0, precoMkt: 0 },
      { nome: "Blueberry", qtd: 535, custoProducao: 0, precoMkt: 0 },
      { nome: "Carrot", qtd: 260, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Slums Provisions": {
    materiais: [
      { nome: "Small Log", qtd: 200, custoProducao: 0, precoMkt: 0 },
      { nome: "Shank", qtd: 65, custoProducao: 0, precoMkt: 0 },
      { nome: "Potato", qtd: 690, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Sombreshade's Pie": {
    materiais: [
      { nome: "Pumpkin", qtd: 60, custoProducao: 0, precoMkt: 0 },
      { nome: "Milk", qtd: 60, custoProducao: 0, precoMkt: 0 },
      { nome: "Ground Flour", qtd: 110, custoProducao: 0, precoMkt: 0 },
      { nome: "Honey", qtd: 80, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Fried Chicken": {
    materiais: [
      { nome: "Onion", qtd: 80, custoProducao: 0, precoMkt: 0 },
      { nome: "Garlic", qtd: 120, custoProducao: 0, precoMkt: 0 },
      { nome: "Ground Flour", qtd: 95, custoProducao: 0, precoMkt: 0 },
      { nome: "Chicken", qtd: 75, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Winemakers Kit": {
    materiais: [
      { nome: "Grape", qtd: 200, custoProducao: 0, precoMkt: 0 },
      { nome: "Blueberry", qtd: 385, custoProducao: 0, precoMkt: 0 },
      { nome: "Moonberry", qtd: 92, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "General Spices": {
    materiais: [
      { nome: "Garlic", qtd: 148, custoProducao: 0, precoMkt: 0 },
      { nome: "Onion", qtd: 105, custoProducao: 0, precoMkt: 0 },
      { nome: "Pepper", qtd: 118, custoProducao: 0, precoMkt: 0 },
      { nome: "Salt", qtd: 13, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Sajecho Fruit Basket": {
    materiais: [
      { nome: "Banana", qtd: 40, custoProducao: 0, precoMkt: 0 },
      { nome: "Watermelon", qtd: 20, custoProducao: 0, precoMkt: 0 },
      { nome: "Orange", qtd: 14, custoProducao: 0, precoMkt: 0 },
      { nome: "Grape", qtd: 94, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Settler's Rations": {
    materiais: [
      { nome: "Corn", qtd: 200, custoProducao: 0, precoMkt: 0 },
      { nome: "Potato", qtd: 650, custoProducao: 0, precoMkt: 0 },
      { nome: "Shank", qtd: 56, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Oceanic Stimulants": {
    materiais: [
      { nome: "Fungal Dust", qtd: 380, custoProducao: 0, precoMkt: 0 },
      { nome: "Pirate's Bliss", qtd: 290, custoProducao: 0, precoMkt: 0 },
      { nome: "Tin Ore", qtd: 160, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Pie Making Kit": {
    materiais: [
      { nome: "Apple", qtd: 56, custoProducao: 0, precoMkt: 0 },
      { nome: "Sunberry", qtd: 65, custoProducao: 0, precoMkt: 0 },
      { nome: "Cherry", qtd: 25, custoProducao: 0, precoMkt: 0 },
      { nome: "Ground Flour", qtd: 60, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Seabreeze Rum": {
    materiais: [
      { nome: "Cabbage", qtd: 65, custoProducao: 0, precoMkt: 0 },
      { nome: "Banana", qtd: 30, custoProducao: 0, precoMkt: 0 },
      { nome: "Blueberry", qtd: 212, custoProducao: 0, precoMkt: 0 },
      { nome: "Corn", qtd: 200, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Bakers Basic": {
    materiais: [
      { nome: "Milk", qtd: 97, custoProducao: 0, precoMkt: 0 },
      { nome: "Egg", qtd: 240, custoProducao: 0, precoMkt: 0 },
      { nome: "Ground Flour", qtd: 230, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Ravencrest Finest Wears": {
    materiais: [
      { nome: "Cotton", qtd: 125, custoProducao: 0, precoMkt: 0 },
      { nome: "Wool", qtd: 78, custoProducao: 0, precoMkt: 0 },
      { nome: "Hide", qtd: 50, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Seer's Support Pack": {
    materiais: [
      { nome: "Thorny Roots", qtd: 400, custoProducao: 0, precoMkt: 0 },
      { nome: "Shadow Stem", qtd: 190, custoProducao: 0, precoMkt: 0 },
      { nome: "Mindbender", qtd: 132, custoProducao: 0, precoMkt: 0 },
      { nome: "Feather", qtd: 20, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Berry Basket": {
    materiais: [
      { nome: "Blueberry", qtd: 445, custoProducao: 0, precoMkt: 0 },
      { nome: "Moonberry", qtd: 30, custoProducao: 0, precoMkt: 0 },
      { nome: "Sunberry", qtd: 100, custoProducao: 0, precoMkt: 0 },
      { nome: "Strawberry", qtd: 200, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Strawberry Cakes": {
    materiais: [
      { nome: "Ground Flour", qtd: 186, custoProducao: 0, precoMkt: 0 },
      { nome: "Milk", qtd: 32, custoProducao: 0, precoMkt: 0 },
      { nome: "Strawberry", qtd: 400, custoProducao: 0, precoMkt: 0 },
      { nome: "Honey", qtd: 120, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Lush Fibers": {
    materiais: [
      { nome: "Wool", qtd: 110, custoProducao: 0, precoMkt: 0 },
      { nome: "Emerald Spores", qtd: 300, custoProducao: 0, precoMkt: 0 },
      { nome: "Juicy Roots", qtd: 285, custoProducao: 0, precoMkt: 0 },
      { nome: "Feather", qtd: 25, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Moisture Aging": {
    materiais: [
      { nome: "Juicy Roots", qtd: 400, custoProducao: 0, precoMkt: 0 },
      { nome: "Dry Stem", qtd: 170, custoProducao: 0, precoMkt: 0 },
      { nome: "Shank", qtd: 50, custoProducao: 0, precoMkt: 0 },
      { nome: "Onion", qtd: 43, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Widow's Box": {
    materiais: [
      { nome: "Lizard's Delight", qtd: 300, custoProducao: 0, precoMkt: 0 },
      { nome: "Crystal Cap", qtd: 140, custoProducao: 0, precoMkt: 0 },
      { nome: "Wailing Leaf", qtd: 155, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Juicers Box": {
    materiais: [
      { nome: "Apple", qtd: 64, custoProducao: 0, precoMkt: 0 },
      { nome: "Strawberry", qtd: 162, custoProducao: 0, precoMkt: 0 },
      { nome: "Cherry", qtd: 26, custoProducao: 0, precoMkt: 0 },
      { nome: "Banana", qtd: 12, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Brined Shank": {
    materiais: [
      { nome: "Shank", qtd: 70, custoProducao: 0, precoMkt: 0 },
      { nome: "Salt", qtd: 14, custoProducao: 0, precoMkt: 0 },
      { nome: "Pepper", qtd: 165, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Exotic Fruits": {
    materiais: [
      { nome: "Watermelon", qtd: 52, custoProducao: 0, precoMkt: 0 },
      { nome: "Sunberry", qtd: 70, custoProducao: 0, precoMkt: 0 },
      { nome: "Moonberry", qtd: 62, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Hardy Roots": {
    materiais: [
      { nome: "Carrot", qtd: 286, custoProducao: 0, precoMkt: 0 },
      { nome: "Purple Roots", qtd: 65, custoProducao: 0, precoMkt: 0 },
      { nome: "Cold Roots", qtd: 175, custoProducao: 0, precoMkt: 0 },
      { nome: "Thin Roots", qtd: 375, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Crafting Basic": {
    materiais: [
      { nome: "Copper Ore", qtd: 140, custoProducao: 0, precoMkt: 0 },
      { nome: "Hide", qtd: 55, custoProducao: 0, precoMkt: 0 },
      { nome: "Small Log", qtd: 200, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Dairy Delivery": {
    materiais: [
      { nome: "Milk", qtd: 80, custoProducao: 0, precoMkt: 0 },
      { nome: "Cheese", qtd: 22, custoProducao: 0, precoMkt: 0 },
      { nome: "Egg", qtd: 246, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Poisoner's Kit": {
    materiais: [
      { nome: "Toxic Stem", qtd: 120, custoProducao: 0, precoMkt: 0 },
      { nome: "Thin Roots", qtd: 240, custoProducao: 0, precoMkt: 0 },
      { nome: "Hagthorn", qtd: 150, custoProducao: 0, precoMkt: 0 },
      { nome: "Thorny Roots", qtd: 150, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Aged Meat": {
    materiais: [
      { nome: "Beef", qtd: 75, custoProducao: 0, precoMkt: 0 },
      { nome: "Salt", qtd: 10, custoProducao: 0, precoMkt: 0 },
      { nome: "Garlic", qtd: 208, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Glaceforde Explorers Kit": {
    materiais: [
      { nome: "Wool", qtd: 106, custoProducao: 0, precoMkt: 0 },
      { nome: "Small Log", qtd: 110, custoProducao: 0, precoMkt: 0 },
      { nome: "Coal", qtd: 100, custoProducao: 0, precoMkt: 0 },
      { nome: "Cotton", qtd: 20, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Necrobane Kit": {
    materiais: [
      { nome: "Bloody Bud", qtd: 250, custoProducao: 0, precoMkt: 0 },
      { nome: "Brightday", qtd: 275, custoProducao: 0, precoMkt: 0 },
      { nome: "Feather", qtd: 48, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Bittersweet Delights": {
    materiais: [
      { nome: "Cherry", qtd: 65, custoProducao: 0, precoMkt: 0 },
      { nome: "Ambar Dust", qtd: 140, custoProducao: 0, precoMkt: 0 },
      { nome: "Green Cap", qtd: 180, custoProducao: 0, precoMkt: 0 },
      { nome: "Thin Roots", qtd: 105, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Campfire Roast": {
    materiais: [
      { nome: "Stone", qtd: 220, custoProducao: 0, precoMkt: 0 },
      { nome: "Chicken", qtd: 68, custoProducao: 0, precoMkt: 0 },
      { nome: "Potato", qtd: 155, custoProducao: 0, precoMkt: 0 },
      { nome: "Small Log", qtd: 120, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Noble Delicacies": {
    materiais: [
      { nome: "Moonberry", qtd: 175, custoProducao: 0, precoMkt: 0 },
      { nome: "Acorn", qtd: 15, custoProducao: 0, precoMkt: 0 },
      { nome: "Pepper", qtd: 70, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Sajecho's Spices": {
    materiais: [
      { nome: "Salt", qtd: 15, custoProducao: 0, precoMkt: 0 },
      { nome: "Orange", qtd: 20, custoProducao: 0, precoMkt: 0 },
      { nome: "Onion", qtd: 150, custoProducao: 0, precoMkt: 0 },
      { nome: "Pepper", qtd: 55, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Kindling Kit": {
    materiais: [
      { nome: "Small Log", qtd: 175, custoProducao: 0, precoMkt: 0 },
      { nome: "Coal", qtd: 124, custoProducao: 0, precoMkt: 0 },
      { nome: "Cotton", qtd: 70, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Butcher's Box": {
    materiais: [
      { nome: "Chicken", qtd: 38, custoProducao: 0, precoMkt: 0 },
      { nome: "Beef", qtd: 90, custoProducao: 0, precoMkt: 0 },
      { nome: "Shank", qtd: 30, custoProducao: 0, precoMkt: 0 },
      { nome: "Cheese", qtd: 5, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Building Materials": {
    materiais: [
      { nome: "Stone", qtd: 240, custoProducao: 0, precoMkt: 0 },
      { nome: "Small Log", qtd: 185, custoProducao: 0, precoMkt: 0 },
      { nome: "Hide", qtd: 68, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Barbecue Specialty": {
    materiais: [
      { nome: "Beef", qtd: 68, custoProducao: 0, precoMkt: 0 },
      { nome: "Chicken", qtd: 26, custoProducao: 0, precoMkt: 0 },
      { nome: "Coal", qtd: 42, custoProducao: 0, precoMkt: 0 },
      { nome: "Honey", qtd: 100, custoProducao: 0, precoMkt: 0 },
    ],
  },
  "Rohna Smoked Ham": {
    materiais: [
      { nome: "Shank", qtd: 40, custoProducao: 0, precoMkt: 0 },
      { nome: "Acorn", qtd: 30, custoProducao: 0, precoMkt: 0 },
      { nome: "Pea", qtd: 92, custoProducao: 0, precoMkt: 0 },
      { nome: "Salt", qtd: 8, custoProducao: 0, precoMkt: 0 },
    ],
  },
};

// Ícone temático por pack (varia conforme a "família" de itens, só estética)
const PACK_ICONS = [
  "🥕", "🍞", "🍖", "🍇", "🌿", "🍯", "🧂", "🐟", "🍄", "🌾",
  "🧵", "🪵", "🍷", "🥧", "🧀", "🥩", "🍒", "🌸", "🦴", "🔥",
];
const packIconFor = (nome) => {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) hash = (hash * 31 + nome.charCodeAt(i)) >>> 0;
  return PACK_ICONS[hash % PACK_ICONS.length];
};

// Mapa de defaults (custoProducao / precoMkt) por material — primeiro valor encontrado
// entre todos os packs é usado como base antes de qualquer override do usuário.
// Isso alimenta a Tabela Global de Materiais: editar um material lá reflete em
// TODOS os packs que o utilizam, pois matsOverride é indexado apenas pelo nome do item.
const MATERIAL_DEFAULTS = {};
Object.values(PACKS).forEach((p) => {
  p.materiais.forEach((m) => {
    if (!(m.nome in MATERIAL_DEFAULTS)) {
      MATERIAL_DEFAULTS[m.nome] = { custoProducao: m.custoProducao ?? 0, precoMkt: m.precoMkt ?? 0 };
    }
  });
});

// Lista única de todos os materiais usados em todos os packs, com contagem de uso
const ALL_PACK_MATERIALS = (() => {
  const map = new Map();
  Object.entries(PACKS).forEach(([packNome, p]) => {
    p.materiais.forEach((m) => {
      if (!map.has(m.nome)) map.set(m.nome, { nome: m.nome, packs: [] });
      map.get(m.nome).packs.push(packNome);
    });
  });
  return Array.from(map.values()).sort((a, b) => a.nome.localeCompare(b.nome));
})();

function Field({ label, value, onChange, suffix, step = "any", hint, min = 0, color, decimals }) {
  const [localValue, setLocalValue] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setLocalValue(String(value));
  }, [value, focused]);

  // Parser robusto para formato BR
  const parseBR = (raw) => {
    const str = String(raw).trim();
    if (str.includes(",")) return parseFloat(str.replace(/\./g, "").replace(",", "."));
    const parts = str.split(".");
    if (parts.length === 2 && parts[1].length === 3 && parts[0].length > 0 && !str.startsWith("0.")) {
      return parseFloat(str.replace(/\./g, ""));
    }
    return parseFloat(str);
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    const parsed = parseBR(e.target.value);
    if (!isNaN(parsed)) onChange(parsed);
  };

  const handleBlur = () => {
    setFocused(false);
    const parsed = parseBR(localValue);
    const final = isNaN(parsed) ? (min ?? 0) : parsed;
    onChange(final);
    setLocalValue(String(final));
  };

  // Display inteligente: usa decimals se passado, senão detecta automaticamente
  const displayValue = focused
    ? localValue
    : value === 0
      ? "0"
      : decimals !== undefined
        ? value.toFixed(decimals)
        : value < 0.01 && value > 0
          ? value.toFixed(8)
          : value < 1 && value > 0
            ? value.toFixed(4)
            : fmtInt(value);

  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          color: dim,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => {
            setFocused(true);
            setLocalValue(String(value));
          }}
          onBlur={handleBlur}
          style={{
            background: "rgba(0,0,0,0.4)",
            border: `1px solid ${color ? color + "55" : "rgba(196,160,80,0.3)"}`,
            borderRadius: 6,
            color: color || "#f0e6c8",
            padding: "8px 12px",
            fontSize: 14,
            width: "100%",
            fontFamily: "'Space Mono', monospace",
            outline: "none",
          }}
        />
        {suffix && <span style={{ color: gold, fontSize: 12, whiteSpace: "nowrap" }}>{suffix}</span>}
      </div>
      {hint && <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

function Section({ title, icon, children, accent, borderColor }) {
  return (
    <div
      style={{
        background: accent ? "rgba(196,160,80,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${borderColor || (accent ? "rgba(196,160,80,0.3)" : "rgba(255,255,255,0.07)")}`,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span
          style={{
            color: gold,
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, sub, color = "#f0e6c8", big, highlight, warn }) {
  return (
    <div
      style={{
        background: highlight ? "rgba(196,160,80,0.08)" : warn ? "rgba(248,113,113,0.05)" : "rgba(0,0,0,0.25)",
        border: `1px solid ${highlight ? "rgba(196,160,80,0.35)" : warn ? "rgba(248,113,113,0.18)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 10,
        padding: "12px 14px",
        textAlign: "center",
      }}
    >
      <div
        style={{ color: "#707080", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}
      >
        {label}
      </div>
      <div
        style={{
          color,
          fontSize: big ? 20 : 15,
          fontFamily: "'Space Mono', monospace",
          fontWeight: "bold",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
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
  const [tab, setTab] = useState("expedicao");
  const [lang, setLang] = useState("ptBR");

  // Estados de Crafting / Oversupply
  const [craftPlayerLevel, setCraftPlayerLevel] = useState(50);
  const [craftOversupply, setCraftOversupply] = useState(0);
  const [craftProfTab, setCraftProfTab] = useState("Blacksmithing");
  const [craftPrices, setCraftPrices] = useState({});
  const [craftMaterialPrices, setCraftMaterialPrices] = useState({});
  const [craftSubcat, setCraftSubcat] = useState("all");
  const [subcraftToggles, setSubcraftToggles] = useState({});
  const [taxQUESTToggles, setTaxQUESTToggles] = useState({});
  const [taxQUESTDesconto, setTaxQUESTDesconto] = useState(20);
  // passivas de EXP por profissão: { Blacksmithing: { p3: 0, p5: 0 }, ... }
  const [craftPassivas, setCraftPassivas] = useState(
    Object.fromEntries(Object.keys(CRAFTING_DB).map((p) => [p, { p3: 0, p5: 0 }]))
  );
  const [gemPrices, setGemPrices] = useState({ Amethyst: 0, Topaz: 0, Emerald: 0, Ruby: 0, Sapphire: 0, Citrine: 0 });

  // ── EXPEDIÇÃO ────────────────────────────────────────────────────────────
  const DIAS_SEMANA = ["Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"];
  const DIAS_SEMANA_EN = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  const [luckCoinSilver, setLuckCoinSilver] = useState(8749000);
  const [luckCoinSaldo, setLuckCoinSaldo] = useState(0); // saldo atual de LC
  const [expGemas, setExpGemas] = useState(Array(7).fill(0));
  const [expEntradas, setExpEntradas] = useState(Array(7).fill(0)); // 0=só free, 1=+1 extra, 2=+2 extras
  const [expJoias, setExpJoias] = useState(0); // informativo apenas

  // GUILDA — preços compartilhados em tempo real
  const [guildId, setGuildId] = useState(null);
  const [guildPlan, setGuildPlan] = useState(null); // 'guild' | 'friends' | null
  const [guildPrices, setGuildPrices] = useState({}); // preços sincronizados da guilda
  const [guildSyncing, setGuildSyncing] = useState(false);
  // Carrega settings do localStorage (modo público)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ravenlab_settings");
      if (saved) {
        const s = JSON.parse(saved);
        if (s.poolRate !== undefined) setPoolRate(s.poolRate);
        if (s.questUSD !== undefined) setQuestUSD(s.questUSD);
        if (s.questToSilver !== undefined) setQuestToSilver(s.questToSilver);
        if (s.imExpSemana !== undefined) setImExpSemana(s.imExpSemana);
        if (s.joiasTotal !== undefined) setJoiasTotal(s.joiasTotal);
        if (s.craftMaterialPrices !== undefined) setCraftMaterialPrices(s.craftMaterialPrices);
        if (s.craftPrices !== undefined) setCraftPrices(s.craftPrices);
        if (s.craftPlayerLevel !== undefined) setCraftPlayerLevel(s.craftPlayerLevel);
        if (s.craftOversupply !== undefined) setCraftOversupply(s.craftOversupply);
        if (s.gemPrices !== undefined) setGemPrices(s.gemPrices);
        if (s.luckCoinSilver !== undefined) setLuckCoinSilver(s.luckCoinSilver);
        if (s.luckCoinSaldo !== undefined) setLuckCoinSaldo(s.luckCoinSaldo);
        if (s.expGemas !== undefined) setExpGemas(s.expGemas);
        if (s.expEntradas !== undefined) setExpEntradas(s.expEntradas);
        if (s.subcraftToggles !== undefined) setSubcraftToggles(s.subcraftToggles);
        if (s.taxQUESTToggles !== undefined) setTaxQUESTToggles(s.taxQUESTToggles);
        if (s.taxMktCrafting !== undefined) setTaxMktCrafting(s.taxMktCrafting);
        if (s.taxSaqueAtivo !== undefined) setTaxSaqueAtivo(s.taxSaqueAtivo);
        if (s.taxSaquePct !== undefined) setTaxSaquePct(s.taxSaquePct);
        if (s.feeCredit !== undefined) setFeeCredit(s.feeCredit);
        if (s.taxExchHunt !== undefined) setTaxExchHunt(s.taxExchHunt);
        if (s.lang !== undefined) setLang(s.lang);
      }
    } catch {}
  }, []);

  // GUILDA — subscrição realtime de preços compartilhados
  useEffect(() => {
    const isGuildPlan = guildPlan === "guild" || guildPlan === "friends";
    if (!guildId || !isGuildPlan) return;

    // Carrega preços iniciais da guilda
    const loadGuildPrices = async () => {
      const { data } = await supabase.from("guild_market_prices").select("*").eq("guild_id", guildId).single();
      if (data?.prices) setGuildPrices(data.prices);
    };
    loadGuildPrices();

    // Subscrição realtime — qualquer membro atualiza, todos recebem
    const channel = supabase
      .channel(`guild_prices_${guildId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "guild_market_prices",
          filter: `guild_id=eq.${guildId}`,
        },
        (payload) => {
          if (payload.new?.prices) setGuildPrices(payload.new.prices);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [guildId, guildPlan]);

  // Helper — publica preço da guilda quando usuário edita
  const updateGuildPrice = async (key, val) => {
    if (!guildId || (guildPlan !== "guild" && guildPlan !== "friends")) return;
    const newPrices = { ...guildPrices, [key]: val };
    setGuildPrices(newPrices);
    setGuildSyncing(true);
    await supabase.from("guild_market_prices").upsert(
      {
        guild_id: guildId,
        prices: newPrices,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "guild_id" }
    );
    setTimeout(() => setGuildSyncing(false), 1000);
  };

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
  // ══════════════════════════════════════════════════════════════════════
  // FÓRMULA OFICIAL DO TRADEPACK (base + distância × coeficiente)
  // Vale para TODOS os packs — a fórmula da Tavernlight é por rota/distância,
  // não por tipo de item, então o mesmo cálculo se aplica a qualquer pack.
  //
  // Fórmula base divulgada oficialmente (patch 1.0.8, post TL de 21/05/2025):
  //   Silver = 35.000 + (Distância × 8,5)
  //
  // Ajuste do patch 1.0.9.5 (16/06/2026): changelog oficial declara aumento
  // de "aproximadamente 340%" (fator ×4,4) no valor-base e no escalonamento
  // por distância. A Tavernlight NÃO divulgou os coeficientes exatos novos,
  // então aplicamos o fator ×4,4 sobre a fórmula anterior:
  //
  //   Silver = (35.000 + Distância × 8,5) × 4,4
  //          ≈ 154.000 + (Distância × 37,4)
  //
  // ⚠️ Isso é uma EXTRAPOLAÇÃO (+340% aplicado uniformemente à fórmula antiga),
  // não os coeficientes reais publicados pela TL. Vale só para packs criados
  // a partir de 16/06/2026. Recalibrar assim que houver dado real pós-patch.
  // ══════════════════════════════════════════════════════════════════════
  const BASE_TRADEPACK_1080 = 35000; // base oficial pré-1.0.9.5 (post TL 21/05/2025)
  const COEF_DISTANCIA_1080 = 8.5; // coeficiente oficial pré-1.0.9.5 (post TL 21/05/2025)
  const AJUSTE_PATCH_1095 = 4.4; // +340% (changelog oficial 16/06/2026), fator não confirmado com precisão
  const BASE_TRADEPACK_1095 = BASE_TRADEPACK_1080 * AJUSTE_PATCH_1095; // ≈ 154.000
  const COEF_DISTANCIA_1095 = COEF_DISTANCIA_1080 * AJUSTE_PATCH_1095; // ≈ 37,4

  // Demanda LOCAL: % exibido no Tradepost por destino, visto ao abrir o menu
  // de tradepack (tecla T) → selecionar o pack → clicar na seta/caret, que
  // mostra o dropdown com todos os destinos e o % de demanda de cada um.
  // É por par (pack, destino) — não por origem — e muda a cada entrega feita
  // por qualquer jogador naquele posto. Guardamos por pack+destino pra você
  // reaproveitar o último valor visto sem redigitar toda vez.
  //
  // IMPORTANTE sobre a escala: no jogo, 100% é o valor NORMAL/baseline (visto
  // no site de referência: valores tipo 103%, 106%, 150% — nunca perto de 0).
  // Então a demanda entra como multiplicador direto (demandaPct/100), não como
  // "1 + demandaPct/100". Sem dado do jogador, assumimos 100% (neutro).
  //
  // Modificadores: bônus percentuais de talento/canal que empilham sobre o
  // valor final (confirmado pelo jogador que todos somam). Valores fixos:
  // Bartering I (+5%), Bartering II (+10%), Plundering (+10%) e
  // Stolen (-20%) — todos aplicados sobre a venda final do pack, via
  // checkboxes simples, sem % editável.
  const calcularSilverTradepack = (distancia, demandaPct = 100, modificadoresPct = 0) =>
    Math.round(
      (BASE_TRADEPACK_1095 + distancia * COEF_DISTANCIA_1095) *
        (demandaPct / 100) *
        (1 + modificadoresPct / 100)
    );

  const [packSelecionado, setPackSelecionado] = useState("Cavedweller Findings");
  const [packSearch, setPackSearch] = useState("");
  const [matGlobalSearch, setMatGlobalSearch] = useState("");
  const [matGlobalOnlyEmpty, setMatGlobalOnlyEmpty] = useState(false);
  const [qtdPacks, setQtdPacks] = useState(10);
  // Distância calibrada para reproduzir o valor empírico anterior (79.126 silver
  // na fórmula pré-1.0.9.5) — ajuste esse valor para a distância real da sua rota.
  const [distanciaPack, setDistanciaPack] = useState(5191);
  const [packOrigem, setPackOrigem] = useState("");
  const [packDestino, setPackDestino] = useState("");
  // Demanda local salva por pack + destino: { [packSelecionado]: { [destino]: percent } }
  const [packDemandas, setPackDemandas] = useState({});
  // Modificadores: toggles simples (checkbox), percentuais fixos aplicados na
  // venda final do pack — todos empilham/somam entre si.
  const MOD_BARTERING1_PCT = 5; // Bartering I: +5% no valor do pack
  const MOD_BARTERING2_PCT = 10; // Bartering II: +10% no valor do pack
  const MOD_PLUNDERING_PCT = 10; // Plundering: +10% no valor do pack
  const MOD_STOLEN_PCT = -20; // Stolen: -20% no valor do pack
  const [modBartering1On, setModBartering1On] = useState(false);
  const [modBartering2On, setModBartering2On] = useState(false);
  const [modPlunderingOn, setModPlunderingOn] = useState(false);
  const [modStolenOn, setModStolenOn] = useState(false);
  useEffect(() => {
    const steps = getTradepostSteps(packOrigem, packDestino);
    if (steps !== null) setDistanciaPack(steps);
  }, [packOrigem, packDestino]);
  // 100 = neutro (padrão do jogo) quando o jogador ainda não informou o real
  const demandaPack = packDemandas[packSelecionado]?.[packDestino] ?? 100;
  const setDemandaDestino = (destino, valor) => {
    setPackDemandas((prev) => ({
      ...prev,
      [packSelecionado]: { ...(prev[packSelecionado] || {}), [destino]: valor },
    }));
  };
  const modificadoresTotal =
    (modBartering1On ? MOD_BARTERING1_PCT : 0) +
    (modBartering2On ? MOD_BARTERING2_PCT : 0) +
    (modPlunderingOn ? MOD_PLUNDERING_PCT : 0) +
    (modStolenOn ? MOD_STOLEN_PCT : 0);
  const silverPorPack = calcularSilverTradepack(distanciaPack, demandaPack, modificadoresTotal);
  const imPorPack = silverPorPack * 10;
  const [qtdEnhanced, setQtdEnhanced] = useState(0);
  // Primed Tradepack Enhancers — obtidos por fator sorte (sem custo em QUEST),
  // armazenados como cargas com capacidade máxima de 100. enhancerStock é o
  // estoque persistido; enhancerGanhos são as cargas obtidas nesta semana,
  // que se fundem automaticamente ao estoque (ver useEffect de consumo abaixo).
  const [enhancerStock, setEnhancerStock] = useState(0);
  const [enhancerGanhos, setEnhancerGanhos] = useState(0);
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
    "Copper Ore": { qtd: 0, preco: 0 },
    "Tin Ore": { qtd: 0, preco: 0 },
    "Iron Ore": { qtd: 0, preco: 0 },
    Stone: { qtd: 0, preco: 0 },
    Salt: { qtd: 0, preco: 0 },
    "Cobalt Ore": { qtd: 0, preco: 0 },
    "Titanium Ore": { qtd: 0, preco: 0 },
  });

  // GEMAS
  const [mineGems, setMineGems] = useState({
    Ruby: { qtd: 0, preco: 0 },
    Ametista: { qtd: 0, preco: 0 },
    Esmeralda: { qtd: 0, preco: 0 },
    Citrine: { qtd: 0, preco: 0 },
    Safira: { qtd: 0, preco: 0 },
    Topaz: { qtd: 0, preco: 0 },
  });

  const setOre = (nome, campo, val) => setMineOres((prev) => ({ ...prev, [nome]: { ...prev[nome], [campo]: val } }));
  const setGem = (nome, campo, val) => setMineGems((prev) => ({ ...prev, [nome]: { ...prev[nome], [campo]: val } }));

  // Totais base (1 hora)
  const huntSilverHora = huntAddonQtd * huntAddonPreco + huntInfusionQtd * huntInfusionPreco + huntNPC;
  const mineSilverHora =
    Object.values(mineOres).reduce((a, v) => a + v.qtd * v.preco, 0) +
    Object.values(mineGems).reduce((a, v) => a + v.qtd * v.preco, 0);

  // Projeções baseadas nas horas/dia configuradas
  const huntSilverDia = huntSilverHora * huntHorasDia;
  const huntSilverMes = huntSilverDia * 30;
  const mineSilverDia = mineSilverHora * mineHorasDia;
  const mineSilverMes = mineSilverDia * 30;

  const toUSD = (silver, exchAtivo = false, saqueAtivo = false) => {
    const quest = applyExchQ(silver / questToSilver, exchAtivo);
    const questLiq = saqueAtivo ? applySaque(quest) : quest;
    return questLiq * questUSD;
  };

  // ── INFUSIONS ─────────────────────────────────────────────────────────────
  const INFUSIONS = [
    { nome: "Infusion", exp: 10, tipo: "terra" },
    { nome: "Warband Infusion", exp: 20, tipo: "terra" },
    { nome: "Ancient Infusion", exp: 40, tipo: "terra" },
    { nome: "Carved Infusion", exp: 60, tipo: "terra" },
    { nome: "Ghostly Infusion", exp: 75, tipo: "terra" },
    { nome: "Ornate Infusion", exp: 90, tipo: "terra" },
    { nome: "Radiant Infusion", exp: 105, tipo: "terra" },
    { nome: "Tidal Infusion", exp: 45, tipo: "mar" },
    { nome: "Abyssal Infusion", exp: 275, tipo: "mar" },
    { nome: "Oceanic Infusion", exp: 125, tipo: "mar" },
    { nome: "Maelstrom Infusion", exp: 550, tipo: "mar" },
  ];

  const [infusionPrecos, setInfusionPrecos] = useState(Object.fromEntries(INFUSIONS.map((i) => [i.nome, 0])));
  const [infusionTargetEXP, setInfusionTargetEXP] = useState(10000);
  const [infusionQtdHora, setInfusionQtdHora] = useState(Object.fromEntries(INFUSIONS.map((i) => [i.nome, 0])));
  const [infusionCompra, setInfusionCompra] = useState(Object.fromEntries(INFUSIONS.map((i) => [i.nome, 0])));

  const setInfusionPreco = (nome, val) => setInfusionPrecos((prev) => ({ ...prev, [nome]: val }));
  const setInfusionQtd = (nome, val) => setInfusionQtdHora((prev) => ({ ...prev, [nome]: val }));
  const setInfusionBuy = (nome, val) => setInfusionCompra((prev) => ({ ...prev, [nome]: val }));

  const infusionRanking = INFUSIONS.map((inf) => {
    const preco = infusionPrecos[inf.nome] || 0;
    const silverPerExp = preco > 0 ? preco / inf.exp : Infinity;
    const qtdNecessaria = preco > 0 ? Math.ceil(infusionTargetEXP / inf.exp) : 0;
    const custoTotal = qtdNecessaria * preco;
    return { ...inf, preco, silverPerExp, qtdNecessaria, custoTotal };
  }).sort((a, b) => a.silverPerExp - b.silverPerExp);

  const melhorInfusion = infusionRanking.find((i) => i.preco > 0);

  // Ranking de Hunt — silver/hora = qtd_por_hora × preço_mkt
  const huntDropRanking = INFUSIONS.map((inf) => {
    const qtd = infusionQtdHora[inf.nome] || 0;
    const preco = infusionPrecos[inf.nome] || 0;
    const silverHora = qtd * preco;
    return { ...inf, qtd, preco, silverHora };
  })
    .filter((i) => i.silverHora > 0)
    .sort((a, b) => b.silverHora - a.silverHora);

  // Ranking de Flip — lucro = preço_venda × (1 - taxa%) - preço_compra
  const flipRanking = INFUSIONS.map((inf) => {
    const venda = infusionPrecos[inf.nome] || 0;
    const compra = infusionCompra[inf.nome] || 0;
    const lucroUnit = venda > 0 && compra > 0 ? venda * (taxMktInfusion ? 0.96 : 1) - compra : 0;
    const margemPct = compra > 0 && lucroUnit > 0 ? (lucroUnit / compra) * 100 : 0;
    return { ...inf, venda, compra, lucroUnit, margemPct };
  })
    .filter((i) => i.lucroUnit > 0)
    .sort((a, b) => b.margemPct - a.margemPct);

  // TAXAS
  const [taxMktTradepack, setTaxMktTradepack] = useState(false); // 4% venda mkt materiais
  const [taxMktMateriais, setTaxMktMateriais] = useState(true); // 4% venda mkt materiais
  const [taxMktCrafting, setTaxMktCrafting] = useState(true); // 4% venda mkt crafting
  const [taxMktInfusion, setTaxMktInfusion] = useState(true); // 4% flip infusion (padrão ON)
  const [taxExchTradepack, setTaxExchTradepack] = useState(true); // 4% exchange silver→QUEST tradepack
  const [taxExchHunt, setTaxExchHunt] = useState(true); // 4% exchange hunt
  const [taxSaqueAtivo, setTaxSaqueAtivo] = useState(true); // 20% saque QUEST
  const [taxSaquePct, setTaxSaquePct] = useState(20); // % saque (editável)
  const [feeCredit, setFeeCredit] = useState(0); // QUEST isentos de saque

  // Helpers de taxa
  const applyMkt = (silver, ativo) => (ativo ? silver * 0.96 : silver);
  const applyExch = (silver, ativo) => (ativo ? silver * 0.96 : silver);
  const applyExchQ = (quest, ativo) => (ativo ? quest * 0.96 : quest);
  const applySaque = (quest) => {
    if (!taxSaqueAtivo) return quest;
    const taxavel = Math.max(0, quest - feeCredit);
    const taxaPaga_Q = taxavel * (taxSaquePct / 100);
    return quest - taxaPaga_Q;
  };
  const packAtual = PACKS[packSelecionado];
  const [matsOverride, setMatsOverride] = useState({});
  const [matsQUEST, setMatsQUEST] = useState({});
  // Fonte de cada material: 'plantado' (usa custoProducao) ou 'mkt' (usa precoMkt).
  // Padrão 'mkt' — na prática a grande maioria dos tradepacks é montada com
  // materiais comprados no mercado, então esse é o cenário mais comum. Troque
  // por material conforme você realmente planta/farma aquele item específico.
  const [matsFonte, setMatsFonte] = useState({});
  const getMat = (nome, campo) =>
    matsOverride[nome]?.[campo] !== undefined
      ? matsOverride[nome][campo]
      : (MATERIAL_DEFAULTS[nome]?.[campo] ?? 0);
  const setMat = (nome, campo, val) =>
    setMatsOverride((prev) => ({ ...prev, [nome]: { ...(prev[nome] || {}), [campo]: val } }));
  const toggleQUEST = (nome) => setMatsQUEST((prev) => ({ ...prev, [nome]: !prev[nome] }));
  const getFonte = (nome) => matsFonte[nome] || "mkt";
  const setFonte = (nome, fonte) => setMatsFonte((prev) => ({ ...prev, [nome]: fonte }));
  const toggleFonte = (nome) => setFonte(nome, getFonte(nome) === "mkt" ? "plantado" : "mkt");
  // Custo efetivo de 1 unidade do material, respeitando a fonte escolhida
  // (plantado usa custoProducao, mercado usa precoMkt) + desconto QUEST se ativo
  const getCustoPorFonte = (nome, fonte) => {
    const base = fonte === "mkt" ? getMat(nome, "precoMkt") : getMat(nome, "custoProducao");
    return matsQUEST[nome] ? base * 0.8 : base;
  };
  const getCustoReal = (nome) => getCustoPorFonte(nome, getFonte(nome));

  // ── SUPABASE SETTINGS SYNC ────────────────────────────────────────────────
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // PERSISTÊNCIA — localStorage (modo público)
  const STORAGE_KEY = "ravenlab_v2";
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // IMPORTANTE: nunca usar `return` aqui dentro do try — isso sairia da
      // função inteira do useEffect e pularia o setSettingsLoaded/setDataLoading
      // logo abaixo, travando o app em "carregando..." pra sempre sempre que
      // não houvesse nada salvo ainda (primeira visita, aba anônima, etc.).
      // Por isso o corpo fica dentro de um if(saved) em vez de um early return.
      if (saved) {
        const s = JSON.parse(saved);
        if (s.poolRate !== undefined) setPoolRate(s.poolRate);
        if (s.questUSD !== undefined) setQuestUSD(s.questUSD);
        if (s.questToSilver !== undefined) setQuestToSilver(s.questToSilver);
        if (s.calQUEST !== undefined) setCalQUEST(s.calQUEST);
        if (s.imExpSemana !== undefined) setImExpSemana(s.imExpSemana);
        if (s.joiasTotal !== undefined) setJoiasTotal(s.joiasTotal);
        if (s.packSelecionado !== undefined) setPackSelecionado(s.packSelecionado);
        if (s.qtdPacks !== undefined) setQtdPacks(s.qtdPacks);
        if (s.distanciaPack !== undefined) setDistanciaPack(s.distanciaPack);
        if (s.packOrigem !== undefined) setPackOrigem(s.packOrigem);
        if (s.packDestino !== undefined) setPackDestino(s.packDestino);
        if (s.packDemandas !== undefined) setPackDemandas(s.packDemandas);
        if (s.modBartering1On !== undefined) setModBartering1On(s.modBartering1On);
        if (s.modBartering2On !== undefined) setModBartering2On(s.modBartering2On);
        if (s.modPlunderingOn !== undefined) setModPlunderingOn(s.modPlunderingOn);
        if (s.modStolenOn !== undefined) setModStolenOn(s.modStolenOn);
        if (s.qtdEnhanced !== undefined) setQtdEnhanced(s.qtdEnhanced);
        if (s.enhancerStock !== undefined) setEnhancerStock(s.enhancerStock);
        if (s.enhancerGanhos !== undefined) setEnhancerGanhos(s.enhancerGanhos);
        if (s.custoCert !== undefined) setCustoCert(s.custoCert);
        if (s.matsOverride !== undefined) setMatsOverride(s.matsOverride);
        if (s.matsQUEST !== undefined) setMatsQUEST(s.matsQUEST);
        if (s.matsFonte !== undefined) setMatsFonte(s.matsFonte);
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
        if (s.craftPlayerLevel !== undefined) setCraftPlayerLevel(s.craftPlayerLevel);
        if (s.craftOversupply !== undefined) setCraftOversupply(s.craftOversupply);
        if (s.craftPrices !== undefined) setCraftPrices(s.craftPrices);
        if (s.craftMaterialPrices !== undefined) setCraftMaterialPrices(s.craftMaterialPrices);
        if (s.gemPrices !== undefined) setGemPrices(s.gemPrices);
        if (s.subcraftToggles !== undefined) setSubcraftToggles(s.subcraftToggles);
        if (s.taxQUESTToggles !== undefined) setTaxQUESTToggles(s.taxQUESTToggles);
        if (s.taxQUESTDesconto !== undefined) setTaxQUESTDesconto(s.taxQUESTDesconto);
        if (s.luckCoinSilver !== undefined) setLuckCoinSilver(s.luckCoinSilver);
        if (s.luckCoinSaldo !== undefined) setLuckCoinSaldo(s.luckCoinSaldo);
        if (s.expGemas !== undefined) setExpGemas(s.expGemas);
        if (s.expEntradas !== undefined) setExpEntradas(s.expEntradas);
        if (s.expJoias !== undefined) setExpJoias(s.expJoias);
        if (s.taxMktTradepack !== undefined) setTaxMktTradepack(s.taxMktTradepack);
        if (s.taxMktMateriais !== undefined) setTaxMktMateriais(s.taxMktMateriais);
        if (s.taxMktCrafting !== undefined) setTaxMktCrafting(s.taxMktCrafting);
        if (s.taxMktInfusion !== undefined) setTaxMktInfusion(s.taxMktInfusion);
        if (s.taxExchTradepack !== undefined) setTaxExchTradepack(s.taxExchTradepack);
        if (s.taxExchHunt !== undefined) setTaxExchHunt(s.taxExchHunt);
        if (s.taxSaqueAtivo !== undefined) setTaxSaqueAtivo(s.taxSaqueAtivo);
        if (s.taxSaquePct !== undefined) setTaxSaquePct(s.taxSaquePct);
        if (s.feeCredit !== undefined) setFeeCredit(s.feeCredit);
        if (s.lang !== undefined) setLang(s.lang);
      }
    } catch {}
    setSettingsLoaded(true);
    setDataLoading(false);
  }, []);

  // Monta o snapshot atual de TODAS as configurações — usado tanto pelo
  // auto-save com debounce (2s) quanto pelo flush imediato ao sair da
  // página, então os dois caminhos gravam exatamente o mesmo formato.
  const buildSettingsSnapshot = () => ({
    poolRate,
    questUSD,
    questToSilver,
    calQUEST,
    imExpSemana,
    joiasTotal,
    packSelecionado,
    qtdPacks,
    distanciaPack,
    packOrigem,
    packDestino,
    packDemandas,
    modBartering1On,
    modBartering2On,
    modPlunderingOn,
    modStolenOn,
    qtdEnhanced,
    enhancerStock,
    enhancerGanhos,
    custoCert,
    matsOverride,
    matsQUEST,
    matsFonte,
    huntHorasDia,
    huntAddonQtd,
    huntAddonPreco,
    huntInfusionQtd,
    huntInfusionPreco,
    huntNPC,
    mineHorasDia,
    mineOres,
    mineGems,
    infusionPrecos,
    infusionTargetEXP,
    infusionQtdHora,
    infusionCompra,
    craftPlayerLevel,
    craftOversupply,
    craftPrices,
    craftMaterialPrices,
    gemPrices,
    subcraftToggles,
    taxQUESTToggles,
    taxQUESTDesconto,
    luckCoinSilver,
    luckCoinSaldo,
    expGemas,
    expEntradas,
    expJoias,
    taxMktTradepack,
    taxMktMateriais,
    taxMktCrafting,
    taxMktInfusion,
    taxExchTradepack,
    taxExchHunt,
    taxSaqueAtivo,
    taxSaquePct,
    feeCredit,
    lang,
  });

  // Ref sempre atualizada com o snapshot mais recente (a cada render) — é o
  // que o flush de saída lê, sem precisar recriar listeners a cada mudança.
  const settingsSnapshotRef = useRef(buildSettingsSnapshot());
  useEffect(() => {
    settingsSnapshotRef.current = buildSettingsSnapshot();
  });

  const flushSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsSnapshotRef.current));
    } catch {}
  };

  // Auto-save no localStorage 2s após qualquer mudança
  useEffect(() => {
    if (!settingsLoaded) return;
    setSaving(true);
    const timeout = setTimeout(() => {
      flushSave();
      setSaving(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
      setSaving(false);
    };
  }, [
    poolRate,
    questUSD,
    questToSilver,
    calQUEST,
    imExpSemana,
    joiasTotal,
    packSelecionado,
    qtdPacks,
    distanciaPack,
    packOrigem,
    packDestino,
    packDemandas,
    modBartering1On,
    modBartering2On,
    modPlunderingOn,
    modStolenOn,
    silverPorPack,
    qtdEnhanced,
    enhancerStock,
    enhancerGanhos,
    custoCert,
    matsOverride,
    matsQUEST,
    matsFonte,
    huntHorasDia,
    huntAddonQtd,
    huntAddonPreco,
    huntInfusionQtd,
    huntInfusionPreco,
    huntNPC,
    mineHorasDia,
    mineOres,
    mineGems,
    infusionPrecos,
    infusionTargetEXP,
    infusionQtdHora,
    infusionCompra,
    craftPlayerLevel,
    craftOversupply,
    craftPrices,
    craftMaterialPrices,
    gemPrices,
    subcraftToggles,
    taxQUESTToggles,
    taxQUESTDesconto,
    luckCoinSilver,
    luckCoinSaldo,
    expGemas,
    expEntradas,
    expJoias,
    taxMktTradepack,
    taxMktMateriais,
    taxMktCrafting,
    taxMktInfusion,
    taxExchTradepack,
    taxExchHunt,
    taxSaqueAtivo,
    taxSaquePct,
    feeCredit,
    lang,
    settingsLoaded,
  ]);

  // Flush imediato ao sair da página (fechar aba, recarregar, trocar de app,
  // minimizar) — evita perder mudanças feitas nos últimos 2s antes do
  // debounce do auto-save disparar. 'visibilitychange' cobre mobile/troca de
  // aba (mais confiável que beforeunload nesses casos); 'pagehide' cobre
  // fechar/recarregar no desktop.
  useEffect(() => {
    if (!settingsLoaded) return;
    const onHide = () => flushSave();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flushSave();
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [settingsLoaded]);

  const r = useMemo(() => {
    const MES = 30 / 7;
    const packsSemanais = qtdPacks;
    // Estoque de Enhancer disponível essa semana (estoque salvo + ganhos da
    // semana, sempre limitado à capacidade máxima de 100 cargas). Cada pack
    // Enhanced consome 1 carga, então o número de packs enhanced nunca pode
    // passar do que há disponível.
    const enhancerDisponivel = Math.min(100, enhancerStock + enhancerGanhos);
    const enhancedVal = Math.min(qtdEnhanced, packsSemanais, enhancerDisponivel);
    const enhancerRestante = Math.max(0, enhancerDisponivel - enhancedVal);
    const packsNormais = packsSemanais - enhancedVal;

    const imBase = imPorPack;
    const imNormalTotal = packsNormais * imBase;
    const imEnhancedTotal = enhancedVal * imBase * 2;
    const imTotal_semana = imNormalTotal + imEnhancedTotal;
    const imEfetiva = packsSemanais > 0 ? imTotal_semana / packsSemanais : imBase;

    // Custos de materiais
    const mats = packAtual.materiais;
    const custoProducaoTotal = mats.reduce((acc, m) => acc + m.qtd * getCustoReal(m.nome), 0);
    // Cenários de comparação: quanto custaria o pack se TODOS os materiais
    // fossem comprados no mercado, vs se TODOS fossem plantados/farmados —
    // pra ver se a mistura atual (getCustoReal, por material) compensa.
    const custoSeTodoMkt = mats.reduce((acc, m) => acc + m.qtd * getCustoPorFonte(m.nome, "mkt"), 0);
    const custoSeTodoPlantado = mats.reduce((acc, m) => acc + m.qtd * getCustoPorFonte(m.nome, "plantado"), 0);
    const economiaAtualVsMkt = custoSeTodoMkt - custoProducaoTotal;
    // Valor de mercado após taxa 4% (venda no market)
    const valorMktBruto = mats.reduce((acc, m) => acc + m.qtd * getMat(m.nome, "precoMkt"), 0);
    const valorMktTotal = applyMkt(valorMktBruto, taxMktMateriais);

    const certCusto_Q = 10 * custoCert;
    const certCusto_S = certCusto_Q * questToSilver;

    // Silver líquido por pack entregue
    const silverLiqPorPack = silverPorPack - custoProducaoTotal;

    // ── QUEST dos packs via IM (pool rate) ──────────────────────────────────
    const questIM_sem = imTotal_semana * poolRate;
    const questCerts_sem = packsSemanais * certCusto_Q;
    // QUEST líquido semanal antes do saque
    const questLiq_sem_bruto = questIM_sem - questCerts_sem;

    // Silver recebido pela entrega dos packs (custo de produção é separado)
    const silverLiq_sem = packsSemanais * (taxMktTradepack ? applyMkt(silverPorPack, true) : silverPorPack);

    // Silver → QUEST via exchange (4% exchange fee)
    const questSilverPacks_sem = applyExchQ(silverLiq_sem / questToSilver, taxExchTradepack);

    // Total QUEST semanal e mensal (bruto, antes do saque)
    const expIM = imExpSemana;
    const expQUEST_sem_bruto = expIM * poolRate;

    const totalQUEST_sem_bruto = expQUEST_sem_bruto + questLiq_sem_bruto + questSilverPacks_sem;
    const totalQUEST_mes_bruto = totalQUEST_sem_bruto * MES;

    // Aplica taxa de saque (só em valores positivos)
    const totalQUEST_sem = totalQUEST_sem_bruto > 0 ? applySaque(totalQUEST_sem_bruto) : totalQUEST_sem_bruto;
    const totalQUEST_mes = totalQUEST_sem * MES;

    // ── FIX DO BUG: USD = QUEST × questUSD (não silver × questUSD) ──────────
    const totalUSD_sem = totalQUEST_sem * questUSD;
    const totalUSD_mes = totalQUEST_mes * questUSD;

    // Expedição separada (para display)
    const expQUEST_sem = applySaque(expQUEST_sem_bruto);
    const expQUEST_mes = expQUEST_sem * MES;
    const expUSD_sem = expQUEST_sem * questUSD;
    const expUSD_mes = expQUEST_mes * questUSD;

    // QUEST líquido dos packs (IM + silver, com saque)
    const questLiq_sem = applySaque(questLiq_sem_bruto + questSilverPacks_sem);
    const questLiq_mes = questLiq_sem * MES;
    const questIM_mes = questIM_sem * MES;
    const questCerts_mes = questCerts_sem * MES;

    // Custo oportunidade — vender vs fazer pack
    const lucroVendaMkt = valorMktTotal - custoProducaoTotal;
    const questVendaMkt = applyExchQ(lucroVendaMkt / questToSilver, taxExchTradepack);
    const questPack =
      applyExchQ(silverLiqPorPack / questToSilver, taxExchTradepack) - certCusto_Q + imEfetiva * poolRate;
    const deltaQUEST = questPack - questVendaMkt;

    // Break-even
    const questNecessarioPorPack =
      questVendaMkt + certCusto_Q - applyExchQ(silverLiqPorPack / questToSilver, taxExchTradepack);
    const imBreakeven = poolRate > 0 ? questNecessarioPorPack / poolRate : 0;
    const imBreaakevenEnhanced = poolRate > 0 ? questNecessarioPorPack / (poolRate * 2) : 0;

    // Estratégias comparativas
    const silverPacks_sem = packsSemanais * silverPorPack; // silver bruto recebido
    const silverPacks_mes = silverPacks_sem * MES;
    const lucroVenderMkt_sem = packsSemanais * lucroVendaMkt;
    const lucroVenderMkt_mes = lucroVenderMkt_sem * MES;

    const profitReal_sem = totalUSD_sem;
    const profitReal_mes = totalUSD_mes;

    // applySaque só em valores positivos — saque não faz sentido em negativo
    const questAlt_bruto =
      expQUEST_sem_bruto + applyExchQ((lucroVendaMkt * packsSemanais) / questToSilver, taxExchTradepack);
    const questAlt_sem = questAlt_bruto > 0 ? applySaque(questAlt_bruto) : questAlt_bruto;
    const profitAlt_sem = questAlt_sem * questUSD;
    const profitAlt_mes = profitAlt_sem * MES;

    const diferenca_sem = profitReal_sem - profitAlt_sem;
    const diferenca_mes = profitReal_mes - profitAlt_mes;

    const totalIM = expIM + imTotal_semana;

    return {
      MES,
      packsSemanais,
      enhancedVal,
      enhancerDisponivel,
      enhancerRestante,
      packsNormais,
      imBase,
      imNormalTotal,
      imEnhancedTotal,
      imTotal_semana,
      imEfetiva,
      custoProducaoTotal,
      custoSeTodoMkt,
      custoSeTodoPlantado,
      economiaAtualVsMkt,
      valorMktTotal,
      certCusto_Q,
      certCusto_S,
      silverLiqPorPack,
      silverPacks_sem,
      silverPacks_mes: silverPacks_sem * MES,
      questIM_sem,
      questIM_mes,
      questCerts_sem,
      questCerts_mes,
      questLiq_sem,
      questLiq_mes,
      lucroVendaMkt,
      questVendaMkt,
      questPack,
      deltaQUEST,
      imBreakeven,
      imBreaakevenEnhanced,
      questNecessarioPorPack,
      expIM,
      expQUEST_sem,
      expQUEST_mes,
      expUSD_sem,
      expUSD_mes,
      totalIM,
      totalQUEST_sem,
      totalQUEST_mes,
      totalUSD_sem,
      totalUSD_mes,
      lucroVenderMkt_sem,
      lucroVenderMkt_mes,
      profitReal_sem,
      profitReal_mes,
      profitAlt_sem,
      profitAlt_mes,
      diferenca_sem,
      diferenca_mes,
    };
  }, [
    poolRate,
    questUSD,
    questToSilver,
    imExpSemana,
    packSelecionado,
    qtdPacks,
    distanciaPack,
    packDestino,
    packDemandas,
    modificadoresTotal,
    silverPorPack,
    qtdEnhanced,
    enhancerStock,
    enhancerGanhos,
    custoCert,
    matsOverride,
    matsQUEST,
    matsFonte,
    taxMktTradepack,
    taxMktMateriais,
    taxExchTradepack,
    taxSaqueAtivo,
    taxSaquePct,
    feeCredit,
  ]);

  // Auto-consumo de cargas de Enhancer — funde os ganhos da semana (fator
  // sorte, sem custo em QUEST) no estoque persistido e desconta 1 carga por
  // pack Enhanced aplicado, tudo automaticamente (debounce de 2s, sem botão
  // manual). Depois de "assentar", o estoque restante vira a nova base —
  // é um ledger contínuo, não um simulador que reseta a cada mudança.
  useEffect(() => {
    if (!settingsLoaded) return;
    const t = setTimeout(() => {
      setEnhancerStock((prevStock) => {
        const disponivel = Math.min(100, prevStock + enhancerGanhos);
        const consumido = Math.min(qtdEnhanced, qtdPacks, disponivel);
        return Math.max(0, disponivel - consumido);
      });
      if (enhancerGanhos !== 0) setEnhancerGanhos(0);
    }, 2000);
    return () => clearTimeout(t);
  }, [qtdEnhanced, enhancerGanhos, qtdPacks, settingsLoaded]);

  // Melhores Pagamentos: testa TODAS as origens possíveis pra cada destino e
  // acha a melhor (a fórmula é Silver = base + distância × coef, quanto mais
  // longe a origem, maior o valor — calculamos literalmente todas as combi-
  // nações). Cada linha do ranking é uma rota independente — não presume ida
  // e volta pela mesma origem. Destinos sem % informado entram com 100
  // (neutro/padrão do jogo), marcados como "estimado" no ranking.
  const melhoresRotas = useMemo(() => {
    const demandasDoPack = packDemandas[packSelecionado] || {};

    const rotas = [];
    TRADEPOSTS.forEach((destino) => {
      const bruto = demandasDoPack[destino];
      const informado = bruto !== undefined && bruto !== "";
      const demanda = informado ? Number(bruto) : 100;
      let melhor = null;
      TRADEPOSTS.forEach((origem) => {
        if (origem === destino) return;
        const distancia = getTradepostSteps(origem, destino);
        if (distancia === null) return;
        const silver = calcularSilverTradepack(distancia, demanda, modificadoresTotal);
        const lucro = silver - r.custoProducaoTotal;
        if (!melhor || lucro > melhor.lucro) {
          melhor = { origem, distancia, silver, lucro };
        }
      });
      if (melhor) {
        rotas.push({
          destino,
          demanda,
          informado,
          origem: melhor.origem,
          distancia: melhor.distancia,
          silver: melhor.silver,
          lucro: melhor.lucro,
        });
      }
    });

    return rotas.sort((a, b) => b.lucro - a.lucro);
  }, [packSelecionado, packDemandas, modificadoresTotal, r.custoProducaoTotal]);

  // Melhor Pack (Geral): mesma ideia do ranking acima, mas comparando TODOS os
  // packs entre si — não só o selecionado. Um pack só entra no ranking quando:
  //   1) pelo menos 1 destino tem % de demanda confirmado (packDemandas), e
  //   2) todo material com fonte "mercado" (o padrão) tem precoMkt > 0.
  // Materiais com fonte "plantado" nunca bloqueiam o cálculo, porque custo 0
  // é um valor legítimo pra material obtido de graça. Packs que não atendem
  // os critérios entram na lista de "incompletos" com o que falta preencher,
  // em vez de simplesmente sumirem do ranking ou entrarem com número errado.
  const melhorPackGeral = useMemo(() => {
    const completos = [];
    const incompletos = [];

    Object.keys(PACKS).forEach((packNome) => {
      const mats = PACKS[packNome].materiais;

      const materiaisFaltando = mats
        .filter((m) => getFonte(m.nome) === "mkt" && getMat(m.nome, "precoMkt") <= 0)
        .map((m) => m.nome);

      const custoProducaoTotal = mats.reduce((acc, m) => acc + m.qtd * getCustoReal(m.nome), 0);

      const demandasDoPack = packDemandas[packNome] || {};
      const destinosInformados = TRADEPOSTS.filter((d) => {
        const bruto = demandasDoPack[d];
        return bruto !== undefined && bruto !== "";
      });

      if (materiaisFaltando.length > 0 || destinosInformados.length === 0) {
        incompletos.push({
          packNome,
          materiaisFaltando,
          semPercentual: destinosInformados.length === 0,
          custoProducaoTotal,
        });
        return;
      }

      // Melhor combinação origem × destino, só entre os destinos com % confirmado
      let melhor = null;
      destinosInformados.forEach((destino) => {
        const demanda = Number(demandasDoPack[destino]);
        TRADEPOSTS.forEach((origem) => {
          if (origem === destino) return;
          const distancia = getTradepostSteps(origem, destino);
          if (distancia === null) return;
          const silver = calcularSilverTradepack(distancia, demanda, modificadoresTotal);
          const lucro = silver - custoProducaoTotal;
          if (!melhor || lucro > melhor.lucro) {
            melhor = { origem, destino, distancia, demanda, silver, lucro };
          }
        });
      });

      if (melhor) {
        completos.push({
          packNome,
          custoProducaoTotal,
          imGerado: melhor.silver * 10,
          ...melhor,
        });
      }
    });

    completos.sort((a, b) => b.lucro - a.lucro);
    return { completos, incompletos };
  }, [packDemandas, matsOverride, matsQUEST, matsFonte, modificadoresTotal]);

  const tabs = [
    { id: "tradepack", label: TR[lang].tabTradepack },
    { id: "comparativo", label: TR[lang].tabHunt },
    { id: "expedicao", label: lang === "en" ? "🗺️ Expedition" : "🗺️ Expedição" },
    { id: "mercado", label: TR[lang].tabMateriais },
    { id: "infusion", label: TR[lang].tabInfusion },
    { id: "crafting", label: TR[lang].tabCrafting },
    { id: "calibracao", label: TR[lang].tabCalibracao },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG_DEEP,
        backgroundImage: "radial-gradient(ellipse at 20% 10%, rgba(30,58,95,0.35) 0%, transparent 55%)",
        fontFamily: "'Space Mono', monospace",
        color: TEXT_PRIM,
        padding: "20px 16px",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "1px solid rgba(96,165,250,0.08)",
        }}
      >
        {/* Logo + Nome */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/ravenlab-logo.png" alt="RavenLab" style={{ width: 44, height: 44, objectFit: "contain" }} />
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: TEXT_PRIM,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              RavenLab
            </div>
          </div>
        </div>

        {/* Centro: status de sync */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 10, letterSpacing: "0.1em" }}>
          <span style={{ color: saving ? "rgba(196,160,80,0.6)" : "rgba(74,222,128,0.45)", transition: "color 0.5s" }}>
            {dataLoading ? TR[lang].loading : saving ? TR[lang].saving : settingsLoaded ? TR[lang].sync : ""}
          </span>
          {guildId && (guildPlan === "guild" || guildPlan === "friends") && (
            <span
              style={{
                background: guildSyncing ? "rgba(196,160,80,0.15)" : "rgba(96,165,250,0.08)",
                border: `1px solid ${guildSyncing ? "rgba(196,160,80,0.4)" : "rgba(96,165,250,0.2)"}`,
                borderRadius: 5,
                padding: "2px 8px",
                color: guildSyncing ? gold : "rgba(96,165,250,0.6)",
                fontSize: 9,
                letterSpacing: "0.1em",
                transition: "all 0.3s",
              }}
            >
              {guildSyncing ? "⟳ syncing..." : `🔗 ${guildPlan === "guild" ? "Guild" : "Friends"}`}
            </span>
          )}
        </div>

        {/* Direita: idioma + guild sync */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>

      {/* RESULTADO PRINCIPAL — VEREDICTO + CENÁRIOS (preview com blur) */}
      <div style={{ position: "relative" }}>
        <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none", opacity: 0.6 }}>
        <div
        style={{
          background: BG_CARD,
          border: "1px solid rgba(96,165,250,0.1)",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          {TR[lang].secComparativo2}
        </div>

        {/* VEREDICTO — banner grande e claro */}
        {(() => {
          const diff = r.diferenca_mes; // profitReal_mes - profitAlt_mes
          const packGanha = diff > 0;
          const empate = Math.abs(diff) < 0.5;
          return (
            <div
              style={{
                background: empate
                  ? "rgba(196,160,80,0.08)"
                  : packGanha
                    ? "rgba(74,222,128,0.07)"
                    : "rgba(96,165,250,0.07)",
                border: `2px solid ${empate ? "rgba(196,160,80,0.4)" : packGanha ? "rgba(74,222,128,0.4)" : "rgba(96,165,250,0.4)"}`,
                borderRadius: 12,
                padding: "18px 24px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: empate ? gold : packGanha ? green : blue,
                    fontFamily: "'Space Mono',monospace",
                    marginBottom: 6,
                  }}
                >
                  {empate
                    ? "⚖️ EMPATE"
                    : packGanha
                      ? lang === "en"
                        ? "✅ MAKING PACKS IS BETTER"
                        : "✅ FAZER OS PACKS COMPENSA"
                      : lang === "en"
                        ? "💰 SELLING MATERIALS IS BETTER"
                        : "💰 VENDER OS MATERIAIS COMPENSA"}
                </div>
                <div style={{ fontSize: 11, color: dim, lineHeight: 1.7 }}>
                  {empate
                    ? lang === "en"
                      ? "Both strategies yield similar results"
                      : "Ambas as estratégias geram resultados similares"
                    : packGanha
                      ? lang === "en"
                        ? `Packs generate ${fmtUSD(diff)}/month MORE than selling materials`
                        : `Packs geram ${fmtUSD(diff)}/mês A MAIS que vender os materiais`
                      : lang === "en"
                        ? `Selling materials generates ${fmtUSD(Math.abs(diff))}/month MORE than making packs`
                        : `Vender materiais gera ${fmtUSD(Math.abs(diff))}/mês A MAIS que fazer os packs`}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: dim, marginBottom: 6 }}>
                  📦 {fmtUSD(r.profitReal_mes)}/mês &nbsp;|&nbsp; 💰 {r.profitAlt_mes >= 0 ? "+" : ""}
                  {fmtUSD(r.profitAlt_mes)}/mês
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: packGanha ? green : blue,
                    fontFamily: "'Space Mono',monospace",
                    fontWeight: "bold",
                  }}
                >
                  {packGanha ? "+" : "-"}
                  {fmtUSD(Math.abs(diff))}/mês {lang === "en" ? "in favor of packs" : "a favor dos packs"}
                </div>
              </div>
            </div>
          );
        })()}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          {/* Fazendo os packs */}
          <div
            style={{
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}
            >
              {TR[lang].secFazendoPacks2}
            </div>
            <div style={{ color: pc(r.profitReal_mes), fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
              {r.profitReal_mes >= 0 ? "+" : ""}
              {fmtUSD(r.profitReal_mes)}
              <span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span>
            </div>
            <div
              style={{ color: pc(r.profitReal_sem), fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}
            >
              {r.profitReal_sem >= 0 ? "+" : ""}
              {fmtUSD(r.profitReal_sem)}
              <span style={{ fontSize: 11 }}>/sem</span>
            </div>
            <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              {lang === "en" ? "silver + QUEST ✅" : "silver + QUEST ✅"}
            </div>
          </div>
          {/* Vendendo materiais */}
          <div
            style={{
              background: r.profitAlt_mes >= 0 ? "rgba(251,146,60,0.06)" : "rgba(248,113,113,0.06)",
              border: `1px solid ${r.profitAlt_mes >= 0 ? "rgba(251,146,60,0.3)" : "rgba(248,113,113,0.3)"}`,
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}
            >
              {TR[lang].secVendendo2}
            </div>
            <div style={{ color: pc(r.profitAlt_mes), fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
              {r.profitAlt_mes >= 0 ? "+" : ""}
              {fmtUSD(r.profitAlt_mes)}
              <span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span>
            </div>
            <div
              style={{ color: pc(r.profitAlt_sem), fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}
            >
              {r.profitAlt_sem >= 0 ? "+" : ""}
              {fmtUSD(r.profitAlt_sem)}
              <span style={{ fontSize: 11 }}>/sem</span>
            </div>
            <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              {lang === "en" ? "market sale" : "venda no mkt"} {r.profitAlt_mes >= 0 ? "✅" : "❌"}
            </div>
          </div>
          {/* Diferença */}
          <div
            style={{
              background: r.diferenca_mes >= 0 ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)",
              border: `1px solid ${r.diferenca_mes >= 0 ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}
            >
              📊 Diferença de Estratégia
            </div>
            <div style={{ color: pc(r.diferenca_mes), fontSize: 26, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
              {r.diferenca_mes >= 0 ? "+" : ""}
              {fmtUSD(r.diferenca_mes)}
              <span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace" }}>/mês</span>
            </div>
            <div
              style={{ color: pc(r.diferenca_sem), fontSize: 15, fontFamily: "'Space Mono', monospace", marginTop: 4 }}
            >
              {r.diferenca_sem >= 0 ? "+" : ""}
              {fmtUSD(r.diferenca_sem)}
              <span style={{ fontSize: 11 }}>/sem</span>
            </div>
            <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 6, lineHeight: 1.6 }}>
              {r.diferenca_mes >= 0
                ? lang === "en"
                  ? "Pack worthwhile ✅"
                  : "Pack compensa ✅"
                : lang === "en"
                  ? "Selling mats is better ❌"
                  : "Vender mat. é melhor ❌"}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <Stat label="IM Packs/sem" value={fmtInt(r.imTotal_semana)} sub={`${r.packsSemanais} packs`} color={gold} />
          <Stat
            label="QUEST IM líq."
            value={`${fmt(r.questLiq_sem)}/sem`}
            sub={`${fmt(r.questLiq_mes)}/mês · -${fmt(r.questCerts_sem)} Q certs`}
            color={pc(r.questLiq_sem)}
          />
          <Stat
            label="Delta vs Vender Mat."
            value={`${r.deltaQUEST >= 0 ? "+" : ""}${fmt(r.deltaQUEST)} Q`}
            sub={TR[lang].perPack}
            color={pc(r.deltaQUEST)}
            highlight={r.deltaQUEST >= 0}
            warn={r.deltaQUEST < 0}
          />
        </div>
      </div>
        </div> {/* fecha blur div */}
        {/* Overlay Em Breve */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(5,8,16,0.55)", borderRadius: 16, zIndex: 2 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: "bold", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
            {lang === "en" ? "Coming Soon" : "Em Breve"}
          </div>
          <div style={{ fontSize: 10, color: "rgba(143,160,184,0.4)", fontFamily: "'Space Mono', monospace" }}>
            {lang === "en" ? "Strategy comparison will be available soon" : "O comparativo de estratégias estará disponível em breve"}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => !t.locked && setTab(t.id)}
            style={{
              background:
                tab === t.id
                  ? `linear-gradient(135deg, ${gold}, #8a6a20)`
                  : t.locked
                    ? "rgba(0,0,0,0.15)"
                    : "rgba(0,0,0,0.4)",
              border: `1px solid ${tab === t.id ? gold : t.locked ? "rgba(255,255,255,0.04)" : "rgba(196,160,80,0.3)"}`,
              borderRadius: 8,
              color: tab === t.id ? "#000" : t.locked ? "rgba(255,255,255,0.2)" : dim,
              padding: "8px 16px",
              cursor: t.locked ? "not-allowed" : "pointer",
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              fontWeight: tab === t.id ? "bold" : "normal",
              opacity: t.locked ? 0.5 : 1,
            }}
          >
            {t.label}
            {t.locked ? " 🔒" : ""}
          </button>
        ))}
      </div>

      {/* TAB: TRADEPACK */}
      {tab === "tradepack" && (
        <div>
          <FormulaPanel
            lang={lang}
            title="Tradepack"
            descricao={
              lang === "en"
                ? "Silver per pack is calculated from the official Tavernlight formula (base + distance × coefficient), adjusted by the official +340% factor from patch 1.0.9.5, scaled by the destination's Local Demand % (shown at the Tradepost before crafting), then by any active Modifiers (Bartering, Plundering, Stolen). Merchant Influence (IM) is 10× the Silver value per pack."
                : "O Silver por pack é calculado pela fórmula oficial da Tavernlight (base + distância × coeficiente), ajustada pelo fator oficial de +340% do patch 1.0.9.5, escalada pela Demanda Local % do destino (exibida no Tradepost antes de craftar), e depois pelos Modificadores ativos (Bartering, Plundering, Stolen). A Influência Mercante (IM) é 10× o valor de Silver por pack."
            }
            formulas={[
              {
                label: lang === "en" ? "Base formula (patch 1.0.8, official)" : "Fórmula base (patch 1.0.8, oficial)",
                formula: "Silver = 35.000 + (Distância × 8,5)",
              },
              {
                label:
                  lang === "en"
                    ? "Patch 1.0.9.5 adjustment (+340%, official %, extrapolated coefficients)"
                    : "Ajuste do patch 1.0.9.5 (+340%, % oficial, coeficientes extrapolados)",
                formula: "Silver = (35.000 + Distância × 8,5) × 4,4 ≈ 154.000 + (Distância × 37,4)",
              },
              {
                label:
                  lang === "en"
                    ? "Local demand (per pack + destination, shown in-game: T → pack → caret; 100% = baseline)"
                    : "Demanda local (por pack + destino, exibida in-game: T → pack → seta; 100% = padrão)",
                formula: "Silver = (154.000 + Distância × 37,4) × (DemandaLocal% ÷ 100)",
              },
              {
                label:
                  lang === "en"
                    ? "Modifiers (Bartering I +5%, Bartering II +10%, Plundering +10%, Stolen −20% — stack additively)"
                    : "Modificadores (Bartering I +5%, Bartering II +10%, Plundering +10%, Stolen −20% — somam entre si)",
                formula: "Silver = (154.000 + Distância × 37,4) × (DemandaLocal% ÷ 100) × (1 + Modificadores%)",
              },
              {
                label: lang === "en" ? "Merchant Influence per pack" : "Influência Mercante por pack",
                formula: "IM = Silver × 10",
              },
              {
                label: lang === "en" ? "Net Silver per pack" : "Silver líquido por pack",
                formula: "silverLíquido = Silver − custoMateriais",
              },
              {
                label: lang === "en" ? "Enhancer charge stock" : "Estoque de cargas de Enhancer",
                formula:
                  "disponível = min(100, estoque + ganhosSemana)\nenhancedVal = min(qtdEnhanced, packs, disponível)\nrestante = disponível − enhancedVal",
                nota:
                  lang === "en"
                    ? "Enhancers are luck-based drops, not purchased with QUEST. Max capacity is 100 charges; 1 charge is consumed per Enhanced pack, and applying an Enhancer doubles that pack's IM (+100%)."
                    : "Enhancers são obtidos por fator sorte, não comprados com QUEST. Capacidade máxima de 100 cargas; 1 carga é consumida por pack Enhanced, e aplicar um Enhancer dobra o IM daquele pack (+100%).",
              },
            ]}
          />

          <Section
            title={`📦 ${lang === "en" ? "Tradepack Configuration" : "Configuração do Tradepack"}`}
            icon="📦"
            borderColor="rgba(196,160,80,0.3)"
          >
            {/* Seletor de pack — busca + grid interativo de cards */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div style={{ color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {lang === "en" ? "Pack" : "Pack"} · {Object.keys(PACKS).length} {lang === "en" ? "available" : "disponíveis"}
                </div>
                <div style={{ color: "rgba(143,160,184,0.5)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
                  {packSelecionado}
                </div>
              </div>

              <input
                type="text"
                value={packSearch}
                onChange={(e) => setPackSearch(e.target.value)}
                placeholder={lang === "en" ? "🔍 Search pack by name or material..." : "🔍 Buscar pack por nome ou material..."}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(196,160,80,0.25)",
                  borderRadius: 8,
                  color: TEXT_PRIM,
                  padding: "9px 12px",
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  outline: "none",
                  marginBottom: 10,
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                  gap: 8,
                  maxHeight: 320,
                  overflowY: "auto",
                  paddingRight: 4,
                }}
              >
                {Object.entries(PACKS)
                  .filter(([nome, p]) => {
                    if (!packSearch.trim()) return true;
                    const q = packSearch.trim().toLowerCase();
                    return (
                      nome.toLowerCase().includes(q) ||
                      p.materiais.some((m) => m.nome.toLowerCase().includes(q))
                    );
                  })
                  .map(([nome, p]) => {
                    const ativo = packSelecionado === nome;
                    const semPreco = p.materiais.some((m) => getMat(m.nome, "precoMkt") <= 0);
                    return (
                      <button
                        key={nome}
                        onClick={() => setPackSelecionado(nome)}
                        title={p.materiais.map((m) => `${m.qtd}x ${m.nome}`).join(" · ")}
                        style={{
                          background: ativo ? `linear-gradient(135deg, ${gold}, #8a6a20)` : "rgba(0,0,0,0.4)",
                          border: `1px solid ${ativo ? gold : "rgba(196,160,80,0.25)"}`,
                          borderRadius: 10,
                          color: ativo ? "#000" : dim,
                          padding: "10px 12px",
                          fontFamily: "'Space Mono', monospace",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                          transition: "transform 0.1s, border-color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 14 }}>{packIconFor(nome)}</span>
                          <span style={{ fontSize: 12, fontWeight: ativo ? "bold" : "normal", lineHeight: 1.2 }}>
                            {nome}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: 9,
                            color: ativo ? "rgba(0,0,0,0.6)" : "rgba(143,160,184,0.55)",
                          }}
                        >
                          <span>
                            {p.materiais.length} {lang === "en" ? "materials" : "materiais"}
                          </span>
                          {semPreco && (
                            <span title={lang === "en" ? "Missing market price" : "Falta preço de mercado"}>⚠️</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Seletor de rota — preenche a Distância automaticamente */}
            <div
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  color: dim,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {lang === "en" ? "Route" : "Rota"}
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <select
                  value={packOrigem}
                  onChange={(e) => setPackOrigem(e.target.value)}
                  style={{
                    colorScheme: "dark",
                    background: "#0d1525",
                    border: `1px solid ${packOrigem ? gold : "rgba(196,160,80,0.4)"}`,
                    borderRadius: 6,
                    color: TEXT_PRIM,
                    padding: "8px 12px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" style={{ background: "#0d1525", color: dim }}>
                    {lang === "en" ? "Origin…" : "Origem…"}
                  </option>
                  {TRADEPOSTS.map((t) => (
                    <option key={t} value={t} style={{ background: "#0d1525", color: TEXT_PRIM }}>
                      {t}
                    </option>
                  ))}
                </select>
                <span style={{ color: gold, fontSize: 14 }}>→</span>
                <span
                  style={{
                    background: "#0d1525",
                    border: `1px solid ${packDestino ? gold : "rgba(196,160,80,0.2)"}`,
                    borderRadius: 6,
                    color: packDestino ? TEXT_PRIM : dim,
                    padding: "8px 12px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                  }}
                >
                  {packDestino || (lang === "en" ? "pick below…" : "escolha abaixo…")}
                </span>
                {packOrigem &&
                  packDestino &&
                  (getTradepostSteps(packOrigem, packDestino) === null ? (
                    <span style={{ color: red, fontSize: 11 }}>
                      {lang === "en"
                        ? "Route not mapped yet — keeping last known distance"
                        : "Rota ainda não mapeada — mantendo a última distância conhecida"}
                    </span>
                  ) : (
                    <span style={{ color: gold, fontSize: 13, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>
                      = {fmtInt(distanciaPack)} steps
                    </span>
                  ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {lang === "en"
                  ? "Destination is picked from the Local Demands list or the Best Payouts ranking below. Distance used in the formula: "
                  : "O destino é escolhido na lista de Demandas Locais ou no ranking de Melhores Pagamentos abaixo. Distância usada na fórmula: "}
                <span style={{ color: dim, fontFamily: "'Space Mono', monospace" }}>{fmtInt(distanciaPack)} steps</span>
              </div>
            </div>

            {/* Demandas Locais — % por destino, salvo por pack (T → pack → seta no jogo). */}
            {/* Independente da Partida: a demanda local é uma propriedade do destino, */}
            {/* não da rota — preencha aqui todos os destinos que você já conferiu. */}
            <div
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  color: dim,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{lang === "en" ? "Local Demands" : "Demandas Locais"}</span>
                <span style={{ fontSize: 9, color: "rgba(143,160,184,0.5)", textTransform: "none", letterSpacing: 0 }}>
                  {lang === "en" ? "T → pack → caret icon" : "T → pack → ícone de seta"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  maxHeight: 260,
                  overflowY: "auto",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                {[...TRADEPOSTS].sort().map((t) => {
                  const ehOrigem = t === packOrigem;
                  const selecionado = t === packDestino;
                  const bruto = packDemandas[packSelecionado]?.[t];
                  const informado = bruto !== undefined && bruto !== "";
                  const valor = informado ? bruto : 100;
                  const steps = packOrigem && !ehOrigem ? getTradepostSteps(packOrigem, t) : null;
                  return (
                    <div
                      key={t}
                      onClick={() => !ehOrigem && setPackDestino(t)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto 84px",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: `1px solid ${selecionado ? gold : ehOrigem ? "rgba(96,165,250,0.3)" : "rgba(196,160,80,0.15)"}`,
                        background: selecionado
                          ? "rgba(196,160,80,0.1)"
                          : ehOrigem
                            ? "rgba(96,165,250,0.06)"
                            : "transparent",
                        cursor: ehOrigem ? "default" : "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: selecionado ? TEXT_PRIM : ehOrigem ? blue : dim,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ehOrigem ? "📦" : "📍"} {t}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(143,160,184,0.55)",
                          fontFamily: "'Space Mono', monospace",
                          textAlign: "right",
                          minWidth: 70,
                        }}
                      >
                        {ehOrigem ? (lang === "en" ? "(origin)" : "(origem)") : steps !== null ? `${fmtInt(steps)} steps` : ""}
                      </span>
                      <div
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="number"
                          value={valor}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setDemandaDestino(t, e.target.value === "" ? "" : Number(e.target.value))}
                          title={
                            informado
                              ? undefined
                              : lang === "en"
                                ? "Estimated (100 = baseline) — click to enter the real value"
                                : "Estimado (100 = padrão) — clique pra informar o valor real"
                          }
                          style={{
                            width: 60,
                            background: "#0d1525",
                            border: `1px solid ${selecionado ? gold : informado ? "rgba(74,222,128,0.5)" : "rgba(196,160,80,0.2)"}`,
                            borderRadius: 4,
                            color: informado ? TEXT_PRIM : "rgba(143,160,184,0.5)",
                            fontStyle: informado ? "normal" : "italic",
                            padding: "5px 4px",
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 13,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                        <span style={{ fontSize: 11, color: dim }}>%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {lang === "en"
                  ? "Demand is per pack + destination, independent of departure. Unfilled destinations assume 100% (baseline, shown in italic) until you confirm the real value in-game."
                  : "A demanda é por pack + destino, independente da partida. Destinos não preenchidos assumem 100% (padrão, em itálico) até você confirmar o valor real no jogo."}
              </div>
            </div>

            {/* Melhor Pack (Geral) — compara TODOS os packs entre si, não só o selecionado */}
            <div
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  color: dim,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                🧮 {lang === "en" ? "Best Pack (All Packs)" : "Melhor Pack (Todos os Packs)"}
              </div>

              {melhorPackGeral.completos.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 620, margin: "0 auto" }}>
                  {melhorPackGeral.completos.slice(0, 5).map((p, i) => (
                    <div
                      key={p.packNome}
                      onClick={() => {
                        setPackSelecionado(p.packNome);
                        setPackOrigem(p.origem);
                        setPackDestino(p.destino);
                      }}
                      style={{
                        border: `1px solid ${i === 0 ? gold : "rgba(196,160,80,0.2)"}`,
                        background: i === 0 ? "rgba(196,160,80,0.08)" : "transparent",
                        borderRadius: 8,
                        padding: "10px 12px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: "bold", color: i === 0 ? gold : TEXT_PRIM }}>
                          {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {p.packNome}
                        </span>
                        <span style={{ fontSize: 11, color: "rgba(143,160,184,0.6)", fontFamily: "'Space Mono', monospace", textAlign: "right" }}>
                          {p.origem} → {p.destino} · {fmtInt(p.distancia)} steps · {p.demanda}%
                        </span>
                      </div>
                      <div style={{ fontSize: 12 }}>
                        <span style={{ color: dim }}>Silver: </span>
                        <span style={{ color: gold, fontFamily: "'Space Mono', monospace" }}>{fmtInt(p.silver)}</span>
                        <span style={{ color: dim }}> · {lang === "en" ? "Mat. cost: " : "Custo mat.: "}</span>
                        <span style={{ color: TEXT_PRIM, fontFamily: "'Space Mono', monospace" }}>{fmtInt(p.custoProducaoTotal)}</span>
                        <span style={{ color: dim }}> · {lang === "en" ? "Profit: " : "Lucro: "}</span>
                        <span
                          style={{
                            color: p.lucro >= 0 ? green : red,
                            fontFamily: "'Space Mono', monospace",
                            fontWeight: "bold",
                          }}
                        >
                          {fmtInt(p.lucro)}
                        </span>
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(143,160,184,0.5)", marginTop: 2 }}>
                        IM: {fmtInt(p.imGerado)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "rgba(143,160,184,0.6)", textAlign: "center", padding: "8px 0" }}>
                  {lang === "en"
                    ? "No pack has enough data yet to enter the ranking — fill in the missing data below."
                    : "Nenhum pack tem dados suficientes ainda pra entrar no ranking — preencha os dados faltantes abaixo."}
                </div>
              )}

              {melhorPackGeral.incompletos.length > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(196,160,80,0.15)" }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(143,160,184,0.55)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    ⚠️ {lang === "en" ? "Missing data" : "Dados faltando"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 620, margin: "0 auto" }}>
                    {melhorPackGeral.incompletos.map((p) => (
                      <div
                        key={p.packNome}
                        onClick={() => setPackSelecionado(p.packNome)}
                        style={{
                          border: "1px solid rgba(248,113,113,0.25)",
                          background: "rgba(248,113,113,0.05)",
                          borderRadius: 6,
                          padding: "8px 10px",
                          cursor: "pointer",
                          fontSize: 11,
                        }}
                      >
                        <span style={{ color: TEXT_PRIM, fontWeight: "bold" }}>{p.packNome}</span>
                        <div
                          style={{
                            color: "rgba(248,113,113,0.85)",
                            marginTop: 2,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10.5,
                          }}
                        >
                          {p.semPercentual &&
                            (lang === "en" ? "missing: demand % (any destination)" : "falta: % de demanda (algum destino)")}
                          {p.semPercentual && p.materiaisFaltando.length > 0 && " · "}
                          {p.materiaisFaltando.length > 0 &&
                            (lang === "en"
                              ? `missing market price: ${p.materiaisFaltando.join(", ")}`
                              : `falta preço de mercado: ${p.materiaisFaltando.join(", ")}`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {lang === "en"
                  ? "Compares every pack against every other, using each pack's confirmed demand % and market material prices. Click a ranked pack to load it above; click an incomplete one to jump to its config and fill in what's missing."
                  : "Compara todos os packs entre si, usando o % de demanda confirmado e os preços de mercado dos materiais de cada um. Clique num pack do ranking pra carregá-lo acima; clique num incompleto pra ir até a config dele e preencher o que falta."}
              </div>
            </div>

            {/* Melhores Pagamentos — ranking global: melhor origem×destino pra cada demanda preenchida */}
            <div
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  color: dim,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                🏆 {lang === "en" ? "Best Payouts" : "Melhores Pagamentos"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 620, margin: "0 auto" }}>
                {melhoresRotas.slice(0, 5).map((rota, i) => (
                  <div
                    key={rota.destino}
                    onClick={() => {
                      setPackOrigem(rota.origem);
                      setPackDestino(rota.destino);
                    }}
                    style={{
                      border: `1px solid ${i === 0 ? gold : "rgba(196,160,80,0.2)"}`,
                      background: i === 0 ? "rgba(196,160,80,0.08)" : "transparent",
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "pointer",
                      opacity: rota.informado ? 1 : 0.75,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: "bold", color: i === 0 ? gold : TEXT_PRIM }}>
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {rota.origem} → {rota.destino}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(143,160,184,0.6)", fontFamily: "'Space Mono', monospace" }}>
                        {fmtInt(rota.distancia)} steps ·{" "}
                        <span style={{ fontStyle: rota.informado ? "normal" : "italic" }}>{rota.demanda}%</span>
                        {!rota.informado && (
                          <span style={{ color: "rgba(143,160,184,0.4)" }}>
                            {" "}
                            {lang === "en" ? "(estimated)" : "(estimado)"}
                          </span>
                        )}
                      </span>
                    </div>
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: dim }}>Silver: </span>
                      <span style={{ color: gold, fontFamily: "'Space Mono', monospace" }}>{fmtInt(rota.silver)}</span>
                      <span style={{ color: dim }}> · {lang === "en" ? "Profit: " : "Lucro: "}</span>
                      <span
                        style={{
                          color: rota.lucro >= 0 ? green : red,
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {fmtInt(rota.lucro)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {lang === "en"
                  ? "Each row is independent — the best-paying origin for that destination is picked automatically among all Tradeposts. Rows marked \"estimated\" use the 100% baseline because you haven't confirmed that destination's real demand yet — fill it in above for an accurate ranking. Doesn't assume a round trip; chain whichever destinations pay best. Click a row to load it into the Route above."
                  : "Cada linha é independente — a origem mais lucrativa pra aquele destino é escolhida automaticamente entre todos os Tradeposts. Linhas marcadas \"estimado\" usam o padrão de 100% porque você ainda não confirmou a demanda real daquele destino — preencha acima pra um ranking preciso. Não presume ida e volta; encadeie os destinos que mais pagarem. Clique numa linha pra carregar na Rota acima."}
              </div>
            </div>

            <div
              style={{
                background: BG_CARD,
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: dim, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {lang === "en" ? "Modifiers" : "Modificadores"}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: modificadoresTotal >= 0 ? green : red,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {modificadoresTotal >= 0 ? "+" : ""}
                  {modificadoresTotal}%
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { on: modBartering1On, setOn: setModBartering1On, pct: MOD_BARTERING1_PCT, label: "Bartering I" },
                  { on: modBartering2On, setOn: setModBartering2On, pct: MOD_BARTERING2_PCT, label: "Bartering II" },
                  { on: modPlunderingOn, setOn: setModPlunderingOn, pct: MOD_PLUNDERING_PCT, label: "Plundering" },
                  { on: modStolenOn, setOn: setModStolenOn, pct: MOD_STOLEN_PCT, label: "Stolen" },
                ].map((m) => (
                  <button
                    key={m.label}
                    onClick={() => m.setOn(!m.on)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: `1px solid ${m.on ? green : "rgba(196,160,80,0.25)"}`,
                      background: m.on ? "rgba(74,222,128,0.12)" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 12, color: m.on ? TEXT_PRIM : dim, fontWeight: m.on ? "bold" : "normal" }}>
                      {m.on ? "☑" : "☐"} {m.label}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'Space Mono', monospace",
                        color: m.pct >= 0 ? green : red,
                      }}
                    >
                      {m.pct >= 0 ? "+" : ""}
                      {m.pct}%
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {lang === "en"
                  ? "Fixed bonuses applied to the pack's final sale value. Active modifiers stack additively."
                  : "Bônus fixos aplicados sobre o valor de venda final do pack. Os modificadores ativos somam entre si."}
              </div>
            </div>

            {/* Config numérica */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 8 }}>
              <Field
                label={lang === "en" ? "Packs / week" : "Packs / semana"}
                value={qtdPacks}
                onChange={setQtdPacks}
                step={1}
              />
              <Field
                label={lang === "en" ? "Certificate cost" : "Custo do certificado"}
                value={custoCert}
                onChange={setCustoCert}
                step={0.1}
                suffix="QUEST"
                hint={lang === "en" ? "10 certificates per pack" : "10 certificados por pack"}
              />
              <Field
                label={TR[lang].enhancerApplyLabel}
                value={qtdEnhanced}
                onChange={setQtdEnhanced}
                step={1}
                hint={TR[lang].enhancerApplyHint}
              />
            </div>

            {/* Primed Tradepack Enhancers — estoque de cargas obtidas por fator sorte */}
            <Section title={`🧪 ${TR[lang].enhancerTitle}`} icon="🧪" borderColor="rgba(196,160,80,0.3)">
              <div style={{ marginBottom: 10, fontSize: 10, color: "rgba(143,160,184,0.55)" }}>
                {TR[lang].enhancerDesc}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field
                  label={TR[lang].enhancerGanhosLabel}
                  value={enhancerGanhos}
                  onChange={setEnhancerGanhos}
                  step={1}
                  hint={TR[lang].enhancerGanhosHint}
                />
                <Field
                  label={TR[lang].enhancerStockLabel}
                  value={enhancerStock}
                  onChange={setEnhancerStock}
                  step={1}
                  hint={TR[lang].enhancerStockHint}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <Stat label={TR[lang].enhancerDisponivel} value={fmtInt(r.enhancerDisponivel)} color={gold} />
                <Stat
                  label={TR[lang].enhancerRestante}
                  value={fmtInt(r.enhancerRestante)}
                  color={r.enhancerRestante > 0 ? green : dim}
                />
              </div>
            </Section>

            {/* Silver / IM calculados (read-only, vindos da fórmula) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12, marginBottom: 4 }}>
              <Stat
                label={lang === "en" ? "Silver / pack (formula)" : "Silver / pack (fórmula)"}
                value={fmtInt(silverPorPack)}
                color={gold}
              />
              <Stat
                label={lang === "en" ? "Merchant Influence / pack" : "Influência Mercante / pack"}
                value={fmtInt(imPorPack)}
                color={blue}
              />
            </div>
          </Section>

          {/* Materiais do pack selecionado */}
          <Section
            title={`🧺 ${lang === "en" ? "Pack materials" : "Materiais do pack"}`}
            icon="🧺"
            borderColor="rgba(74,222,128,0.25)"
          >
            <div style={{ color: "rgba(143,160,184,0.6)", fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>
              {lang === "en"
                ? "Market prices here are shared with the 💰 Materials tab — editing one updates the other. Production cost (grown/farmed) only applies here, for this pack's cost calculation."
                : "Os preços de mercado aqui são compartilhados com a aba 💰 Materiais — editar um atualiza o outro. O custo de produção (plantado) só se aplica aqui, pro cálculo de custo deste pack."}
            </div>
            {/* Resumo comparativo: custo atual (misto) vs comprar tudo no mkt vs plantar tudo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 14,
                padding: "10px 12px",
                background: BG_CARD,
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 9, color: dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  {lang === "en" ? "Current cost (mix)" : "Custo atual (misto)"}
                </div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: TEXT_PRIM, fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(r.custoProducaoTotal)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  {lang === "en" ? "If all bought (market)" : "Se comprar tudo (mercado)"}
                </div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: blue, fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(r.custoSeTodoMkt)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  {lang === "en" ? "If all grown/farmed" : "Se plantar tudo"}
                </div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: green, fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(r.custoSeTodoPlantado)}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1", marginTop: 4, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {r.economiaAtualVsMkt > 0 ? (
                  <span style={{ fontSize: 12, color: green }}>
                    ✅ {lang === "en" ? "Your current mix saves " : "Sua mistura atual economiza "}
                    <b style={{ fontFamily: "'Space Mono', monospace" }}>{fmtInt(r.economiaAtualVsMkt)}</b>
                    {lang === "en" ? " silver vs. buying everything on the market." : " silver em relação a comprar tudo no mercado."}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: dim }}>
                    {lang === "en"
                      ? "Everything is set to market price right now — mark materials as 🌱 Grown below if you farm them for less."
                      : "Tudo está marcado como preço de mercado agora — marque materiais como 🌱 Plantado abaixo se você os produz mais barato."}
                  </span>
                )}
              </div>
            </div>

            {/* Ações rápidas: aplicar fonte a todos os materiais do pack de uma vez */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button
                onClick={() => {
                  const upd = {};
                  packAtual.materiais.forEach((m) => (upd[m.nome] = "mkt"));
                  setMatsFonte((prev) => ({ ...prev, ...upd }));
                }}
                style={{
                  fontSize: 11,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(96,165,250,0.35)",
                  background: "rgba(96,165,250,0.08)",
                  color: blue,
                  cursor: "pointer",
                }}
              >
                🛒 {lang === "en" ? "Buy everything on market" : "Comprar tudo no mercado"}
              </button>
              <button
                onClick={() => {
                  const upd = {};
                  packAtual.materiais.forEach((m) => (upd[m.nome] = "plantado"));
                  setMatsFonte((prev) => ({ ...prev, ...upd }));
                }}
                style={{
                  fontSize: 11,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(74,222,128,0.35)",
                  background: "rgba(74,222,128,0.08)",
                  color: green,
                  cursor: "pointer",
                }}
              >
                🌱 {lang === "en" ? "Grow/farm everything" : "Plantar tudo"}
              </button>
            </div>

            <div style={{ marginBottom: 6, display: "grid", gridTemplateColumns: "1fr 0.5fr 0.7fr 0.7fr 50px 100px 0.75fr", gap: 4 }}>
              {[
                lang === "en" ? "Material" : "Material",
                lang === "en" ? "Qty" : "Qtd",
                lang === "en" ? "Prod. cost" : "Custo prod.",
                lang === "en" ? "Market" : "Mercado",
                "QUEST -20%",
                lang === "en" ? "Source" : "Fonte",
                lang === "en" ? "Cost used" : "Custo usado",
              ].map((h) => (
                <span key={h} style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {h}
                </span>
              ))}
            </div>
            {packAtual.materiais.map((m) => {
              const fonte = getFonte(m.nome);
              const custoUnit = getCustoReal(m.nome);
              return (
                <div
                  key={m.nome}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 0.5fr 0.7fr 0.7fr 50px 100px 0.75fr",
                    gap: 4,
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ color: "#c0c0d0", fontSize: 12 }}>{m.nome}</span>
                  <span style={{ color: dim, fontSize: 12 }}>{fmtInt(m.qtd)}</span>
                  <NumInput
                    value={getMat(m.nome, "custoProducao")}
                    onChange={(v) => setMat(m.nome, "custoProducao", v)}
                    min={0}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${fonte === "plantado" ? "rgba(74,222,128,0.4)" : "rgba(196,160,80,0.2)"}`,
                      borderRadius: 6,
                      color: gold,
                      padding: "4px 8px",
                      fontSize: 12,
                      width: "100%",
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                    }}
                  />
                  <NumInput
                    value={getMat(m.nome, "precoMkt")}
                    onChange={(v) => setMat(m.nome, "precoMkt", v)}
                    min={0}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${fonte === "mkt" ? "rgba(96,165,250,0.5)" : "rgba(96,165,250,0.2)"}`,
                      borderRadius: 6,
                      color: blue,
                      padding: "4px 8px",
                      fontSize: 12,
                      width: "100%",
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <div
                      onClick={() => toggleQUEST(m.nome)}
                      title={lang === "en" ? "Buy with QUEST (-20%)" : "Comprar com QUEST (-20%)"}
                      style={{
                        display: "inline-block",
                        width: 30,
                        height: 18,
                        borderRadius: 9,
                        background: matsQUEST[m.nome] ? "#c4a050" : "#303040",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: matsQUEST[m.nome] ? 14 : 2,
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#f0e6c8",
                          transition: "left 0.2s",
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFonte(m.nome)}
                    title={
                      lang === "en"
                        ? "Click to switch between grown and market-bought"
                        : "Clique pra alternar entre plantado e comprado no mercado"
                    }
                    style={{
                      fontSize: 10,
                      padding: "4px 6px",
                      borderRadius: 6,
                      border: `1px solid ${fonte === "mkt" ? "rgba(96,165,250,0.4)" : "rgba(74,222,128,0.4)"}`,
                      background: fonte === "mkt" ? "rgba(96,165,250,0.1)" : "rgba(74,222,128,0.1)",
                      color: fonte === "mkt" ? blue : green,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fonte === "mkt" ? (lang === "en" ? "🛒 Market" : "🛒 Mercado") : lang === "en" ? "🌱 Grown" : "🌱 Plantado"}
                  </button>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Space Mono', monospace",
                      color: fonte === "mkt" ? blue : green,
                      fontWeight: "bold",
                    }}
                  >
                    {fmtInt(custoUnit)} × {fmtInt(m.qtd)} = {fmtInt(custoUnit * m.qtd)}
                  </span>
                </div>
              );
            })}
          </Section>

          {/* Resultados */}
          <Section
            title={`💰 ${lang === "en" ? "Tradepack results" : "Resultado do Tradepack"}`}
            icon="💰"
            borderColor="rgba(196,160,80,0.3)"
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div
                style={{
                  background: "rgba(196,160,80,0.06)",
                  border: "1px solid rgba(196,160,80,0.3)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  {lang === "en" ? "Profit / week" : "Profit / semana"}
                </div>
                <div style={{ color: pc(r.profitReal_sem), fontSize: 24, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                  {r.profitReal_sem >= 0 ? "+" : ""}
                  {fmtUSD(r.profitReal_sem)}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(196,160,80,0.06)",
                  border: "1px solid rgba(196,160,80,0.3)",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  {lang === "en" ? "Profit / month" : "Profit / mês"}
                </div>
                <div style={{ color: pc(r.profitReal_mes), fontSize: 24, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                  {r.profitReal_mes >= 0 ? "+" : ""}
                  {fmtUSD(r.profitReal_mes)}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              <Stat
                label={lang === "en" ? "Material cost / pack" : "Custo material / pack"}
                value={fmtInt(r.custoProducaoTotal)}
              />
              <Stat
                label={lang === "en" ? "Certificate cost / pack" : "Custo certificado / pack"}
                value={`${fmt(r.certCusto_Q, 1)} QUEST`}
              />
              <Stat
                label={lang === "en" ? "Net Silver / pack" : "Silver líquido / pack"}
                value={fmtInt(r.silverLiqPorPack)}
                color={pc(r.silverLiqPorPack)}
              />
              <Stat
                label={lang === "en" ? "Total IM / week" : "IM total / semana"}
                value={fmtInt(r.imTotal_semana)}
                color={blue}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Stat
                label={lang === "en" ? "IM break-even (no Enhanced)" : "IM break-even (sem Enhanced)"}
                value={fmtInt(r.imBreakeven)}
                sub={lang === "en" ? "min. IM/pack to profit" : "IM/pack mínima pra dar lucro"}
              />
              <Stat
                label={lang === "en" ? "IM break-even (Enhanced)" : "IM break-even (Enhanced)"}
                value={fmtInt(r.imBreaakevenEnhanced)}
              />
            </div>
          </Section>
        </div>
      )}

      {/* TAB: HUNT */}
      {tab === "comparativo" && (
        <div>
          <FormulaPanel
            lang={lang}
            title="Hunt"
            descricao={
              lang === "en"
                ? "Calculates silver per hour based on addon drops, infusion usage and NPC silver. The monthly projection uses your configured hours/day × 30 days."
                : "Calcula silver por hora com base nos drops de addon, uso de infusão e silver NPC. A projeção mensal usa suas horas/dia configuradas × 30 dias."
            }
            formulas={[
              {
                label: lang === "en" ? "Silver/hour" : "Silver/hora",
                formula:
                  "silverHora = (qtdAddon × preçoAddon + qtdInfusion × preçoInfusion + silverNPC) × multiplicador",
              },
              {
                label: lang === "en" ? "Monthly projection" : "Projeção mensal",
                formula: "silverMes = silverHora × horasDia × 30",
                nota:
                  lang === "en" ? "Adjust hours/day in the Hunt config" : "Ajuste horas/dia na configuração do Hunt",
              },
              { label: "USD", formula: "USD = (silver ÷ questToSilver) × (1 - exchFee) → applySaque → × questUSD" },
            ]}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* HUNT / CAÇA */}
            <div>
              <Section
                title={`🏹 ${lang === "en" ? "Hunting (Hunt)" : "Caça (Hunt)"}`}
                icon="⚔️"
                borderColor="rgba(248,113,113,0.3)"
              >
                {/* Instrução */}
                <div
                  style={{
                    background: "rgba(248,113,113,0.05)",
                    border: "1px solid rgba(248,113,113,0.15)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 16,
                    fontSize: 11,
                    color: dim,
                    lineHeight: 1.7,
                  }}
                >
                  📌{" "}
                  {lang === "en"
                    ? "Enter the quantity of items collected in "
                    : "Insira a quantidade de itens coletados em "}
                  <strong style={{ color: red }}>1 {lang === "en" ? "hour" : "hora"}</strong>
                  {lang === "en" ? " of hunting." : " de caça."}
                </div>

                {/* Itens */}
                <div style={{ marginBottom: 6, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Item
                  </span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {lang === "en" ? "Qty / hour" : "Qtd / hora"}
                  </span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {TR[lang].matsMkt}
                  </span>
                </div>

                {[
                  {
                    label: "Addon",
                    qtd: huntAddonQtd,
                    preco: huntAddonPreco,
                    setQtd: setHuntAddonQtd,
                    setPreco: setHuntAddonPreco,
                  },
                  {
                    label: "Infusion",
                    qtd: huntInfusionQtd,
                    preco: huntInfusionPreco,
                    setQtd: setHuntInfusionQtd,
                    setPreco: setHuntInfusionPreco,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 1fr",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ color: "#c0c0d0", fontSize: 12 }}>{item.label}</span>
                    <NumInput
                      value={item.qtd}
                      onChange={(v) => item.setQtd(v)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(196,160,80,0.2)",
                        borderRadius: 6,
                        color: "#f0e6c8",
                        padding: "6px 10px",
                        fontSize: 12,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <NumInput
                      value={item.preco}
                      onChange={(v) => item.setPreco(v)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(251,146,60,0.2)",
                        borderRadius: 6,
                        color: orange,
                        padding: "6px 10px",
                        fontSize: 12,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>
                ))}

                {/* NPC */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ color: "#c0c0d0", fontSize: 12 }}>NPC</span>
                  <NumInput
                    value={huntNPC}
                    onChange={(v) => setHuntNPC(v)}
                    min={0}
                    placeholder={lang === "en" ? "Direct silver/hour" : "Silver direto/hora"}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(196,160,80,0.2)",
                      borderRadius: 6,
                      color: "#f0e6c8",
                      padding: "6px 10px",
                      fontSize: 12,
                      width: "100%",
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                    }}
                  />
                </div>

                <Divider label={lang === "en" ? "Projection" : "Projeção"} />

                {/* Horas por dia */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span
                    style={{
                      color: dim,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Horas/dia:
                  </span>
                  <NumInput
                    value={huntHorasDia}
                    onChange={(v) => setHuntHorasDia(v)}
                    min={1}
                    max={24}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${red}55`,
                      borderRadius: 6,
                      color: red,
                      padding: "6px 12px",
                      fontSize: 14,
                      width: 80,
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                      fontWeight: "bold",
                    }}
                  />
                  <span style={{ color: "rgba(143,160,184,0.45)", fontSize: 10 }}>horas de hunt por dia</span>
                </div>

                {/* Cards de projeção hunt */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: lang === "en" ? "1 hour" : "1 hora", silver: huntSilverHora, highlight: false },
                    {
                      label: `${huntHorasDia}h / ${lang === "en" ? "day" : "dia"}`,
                      silver: huntSilverDia,
                      highlight: true,
                    },
                    { label: lang === "en" ? "monthly" : "mensal", silver: huntSilverMes, highlight: false },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: p.highlight ? "rgba(248,113,113,0.08)" : "rgba(0,0,0,0.25)",
                        border: `1px solid ${p.highlight ? "rgba(248,113,113,0.35)" : "rgba(255,255,255,0.05)"}`,
                        borderRadius: 10,
                        padding: "12px 10px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 6,
                        }}
                      >
                        {p.label}
                      </div>
                      <div
                        style={{ color: red, fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}
                      >
                        {fmtInt(p.silver)}
                      </div>
                      <div style={{ color: "#555565", fontSize: 9, marginTop: 4 }}>silver</div>
                      <div style={{ color: red, fontSize: 11, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>
                        {fmtUSD(toUSD(p.silver, taxExchHunt, taxSaqueAtivo))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Taxa Exchange Hunt */}
                <div style={{ marginTop: 12 }}>
                  <TaxToggle
                    label={lang === "en" ? "Exchange fee 4% (silver → QUEST)" : "Taxa exchange 4% (silver → QUEST)"}
                    detail={
                      lang === "en"
                        ? "Applied when converting silver to QUEST"
                        : "Aplicada ao converter silver em QUEST"
                    }
                    active={taxExchHunt}
                    onChange={setTaxExchHunt}
                  />
                  <SaquePanel
                    taxSaqueAtivo={taxSaqueAtivo}
                    setTaxSaqueAtivo={setTaxSaqueAtivo}
                    taxSaquePct={taxSaquePct}
                    setTaxSaquePct={setTaxSaquePct}
                    feeCredit={feeCredit}
                    setFeeCredit={setFeeCredit}
                    lang={lang}
                  />
                </div>
              </Section>
            </div>

            {/* MINERAÇÃO */}
            <div>
              <Section title={`⛏️ ${TR[lang].miningTitle}`} icon="🪨" borderColor="rgba(96,165,250,0.3)">
                <div
                  style={{
                    background: "rgba(96,165,250,0.05)",
                    border: "1px solid rgba(96,165,250,0.15)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 16,
                    fontSize: 11,
                    color: dim,
                    lineHeight: 1.7,
                  }}
                >
                  📌{" "}
                  {lang === "en"
                    ? "Enter the quantity of items collected in "
                    : "Insira a quantidade de itens coletados em "}
                  <strong style={{ color: blue }}>1 {lang === "en" ? "hour" : "hora"}</strong>
                  {lang === "en" ? " of mining." : " de mineração."}
                </div>

                {/* Headers */}
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 60px", gap: 4, marginBottom: 6 }}>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Item</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>
                    {lang === "en" ? "Qty / hour" : "Qtd / hora"}
                  </span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>{TR[lang].matsMkt}</span>
                  <span style={{ color: dim, fontSize: 9, textTransform: "uppercase" }}>Total/h</span>
                </div>

                {/* Ores */}
                {Object.entries(mineOres).map(([nome, v], i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "110px 1fr 1fr 60px",
                      gap: 6,
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "#c0c0d0", fontSize: 11 }}>{nome}</span>
                    <NumInput
                      value={v.qtd}
                      onChange={(val) => setOre(nome, "qtd", val)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(196,160,80,0.2)",
                        borderRadius: 6,
                        color: "#f0e6c8",
                        padding: "5px 8px",
                        fontSize: 11,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <NumInput
                      value={v.preco}
                      onChange={(val) => setOre(nome, "preco", val)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(251,146,60,0.2)",
                        borderRadius: 6,
                        color: orange,
                        padding: "5px 8px",
                        fontSize: 11,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <span
                      style={{
                        color: v.qtd * v.preco > 0 ? green : "rgba(143,160,184,0.45)",
                        fontSize: 10,
                        fontFamily: "'Space Mono', monospace",
                        textAlign: "right",
                      }}
                    >
                      {fmtInt(v.qtd * v.preco)}
                    </span>
                  </div>
                ))}

                <Divider label="💎 Gemas" />

                {Object.entries(mineGems).map(([nome, v], i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "110px 1fr 1fr 60px",
                      gap: 6,
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ color: "#c0c0d0", fontSize: 11 }}>{nome}</span>
                    <NumInput
                      value={v.qtd}
                      onChange={(val) => setGem(nome, "qtd", val)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(196,160,80,0.2)",
                        borderRadius: 6,
                        color: "#f0e6c8",
                        padding: "5px 8px",
                        fontSize: 11,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <NumInput
                      value={v.preco}
                      onChange={(val) => setGem(nome, "preco", val)}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        borderRadius: 6,
                        color: purple,
                        padding: "5px 8px",
                        fontSize: 11,
                        width: "100%",
                        fontFamily: "'Space Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <span
                      style={{
                        color: v.qtd * v.preco > 0 ? green : "rgba(143,160,184,0.45)",
                        fontSize: 10,
                        fontFamily: "'Space Mono', monospace",
                        textAlign: "right",
                      }}
                    >
                      {fmtInt(v.qtd * v.preco)}
                    </span>
                  </div>
                ))}

                <Divider label={lang === "en" ? "Projection" : "Projeção"} />

                {/* Horas por dia mine */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span
                    style={{
                      color: dim,
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {TR[lang].huntHours}:
                  </span>
                  <NumInput
                    value={mineHorasDia}
                    onChange={(v) => setMineHorasDia(v)}
                    min={1}
                    max={24}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${blue}55`,
                      borderRadius: 6,
                      color: blue,
                      padding: "6px 12px",
                      fontSize: 14,
                      width: 80,
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                      fontWeight: "bold",
                    }}
                  />
                  <span style={{ color: "rgba(143,160,184,0.45)", fontSize: 10 }}>
                    {lang === "en" ? "hours of mining per day" : "horas de mineração por dia"}
                  </span>
                </div>

                {/* Cards projeção mine — usa mesmos toggles do Hunt */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: lang === "en" ? "1 hour" : "1 hora", silver: mineSilverHora, highlight: false },
                    {
                      label: `${mineHorasDia}h / ${lang === "en" ? "day" : "dia"}`,
                      silver: mineSilverDia,
                      highlight: true,
                    },
                    { label: lang === "en" ? "monthly" : "mensal", silver: mineSilverMes, highlight: false },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        background: p.highlight ? "rgba(96,165,250,0.08)" : "rgba(0,0,0,0.25)",
                        border: `1px solid ${p.highlight ? "rgba(96,165,250,0.35)" : "rgba(255,255,255,0.05)"}`,
                        borderRadius: 10,
                        padding: "12px 10px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 6,
                        }}
                      >
                        {p.label}
                      </div>
                      <div
                        style={{ color: blue, fontSize: 13, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}
                      >
                        {fmtInt(p.silver)}
                      </div>
                      <div style={{ color: "#555565", fontSize: 9, marginTop: 4 }}>silver</div>
                      <div style={{ color: blue, fontSize: 11, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>
                        {fmtUSD(toUSD(p.silver, taxExchHunt, taxSaqueAtivo))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          {/* Comparativo Hunt vs Tradepack — preview com blur */}
          <div style={{ position: "relative" }}>
            <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none", opacity: 0.6 }}>
          <Section
            title={`📊 ${lang === "en" ? "Hunt vs Tradepack — Monthly Comparison" : "Hunt vs Tradepack — Comparativo Mensal"}`}
            icon="⚖️"
            accent
          >
            <div style={{ color: dim, fontSize: 10, marginBottom: 14, lineHeight: 1.6 }}>
              {lang === "en"
                ? `Based on ${huntHorasDia}h/day hunting · ${mineHorasDia}h/day mining · ${qtdPacks} packs/week tradepack`
                : `Baseado em ${huntHorasDia}h/dia de hunt · ${mineHorasDia}h/dia de mineração · ${qtdPacks} packs/semana de tradepack`}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                {
                  label: "🏹 Hunt",
                  mes: huntSilverMes,
                  dia: huntSilverDia,
                  hora: huntSilverHora,
                  color: red,
                  exch: taxExchHunt,
                },
                {
                  label: `⛏️ ${TR[lang].miningTitle}`,
                  mes: mineSilverMes,
                  dia: mineSilverDia,
                  hora: mineSilverHora,
                  color: blue,
                  exch: taxExchHunt,
                },
                {
                  label: "📦 Tradepack Prime",
                  mes: r.totalUSD_mes,
                  dia: r.totalUSD_mes / 30,
                  hora: r.totalUSD_mes / 30 / 24,
                  color: gold,
                  isUSD: true,
                },
              ].map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: dim,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 10,
                    }}
                  >
                    {a.label}
                  </div>
                  <div
                    style={{ color: a.color, fontSize: 18, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}
                  >
                    {a.isUSD ? fmtUSD(a.mes) : fmtUSD(toUSD(a.mes, a.exch, taxSaqueAtivo))}
                    <span style={{ fontSize: 10 }}>/{lang === "en" ? "month" : "mês"}</span>
                  </div>
                  <div style={{ color: a.color, fontSize: 12, marginTop: 4 }}>
                    {a.isUSD ? fmtUSD(a.dia) : fmtUSD(toUSD(a.dia, a.exch, taxSaqueAtivo))}
                    <span style={{ fontSize: 9 }}>/{lang === "en" ? "day" : "dia"}</span>
                  </div>
                  <div style={{ color: "rgba(143,160,184,0.45)", fontSize: 10, marginTop: 4 }}>
                    {a.isUSD ? fmtUSD(a.hora) : fmtUSD(toUSD(a.hora, a.exch, taxSaqueAtivo))}
                    <span style={{ fontSize: 9 }}>/{lang === "en" ? "hour" : "hora"}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
            </div> {/* fecha blur */}
            {/* Overlay Em Breve */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(5,8,16,0.55)", borderRadius: 12, zIndex: 2 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>🔒</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: "bold", color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                {lang === "en" ? "Coming Soon" : "Em Breve"}
              </div>
              <div style={{ fontSize: 10, color: "rgba(143,160,184,0.35)", fontFamily: "'Space Mono', monospace" }}>
                {lang === "en" ? "Tradepack comparison available soon" : "Comparativo com Tradepack disponível em breve"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MATERIAIS */}
      {tab === "expedicao" &&
        (() => {
          // ── Custos de Lucky Coin e Munk Snack ──────────────────────────────
          const custoPorSnack = (luckCoinSilver * 15) / 10;
          const custoEntrada1 = 12 * custoPorSnack;
          const custoEntrada2 = 33 * custoPorSnack;
          const custoEntradaFree = 50000;

          // Melhor pacote oficial (menor custo/LC em silver equivalente)
          const pacotesOficiais = [
            { qty: 20, usd: 8 },
            { qty: 105, usd: 40 },
            { qty: 550, usd: 200 },
            { qty: 2275, usd: 800 },
          ].map((p) => ({
            ...p,
            silverEquiv: questUSD > 0 ? (p.usd / p.qty / questUSD) * questToSilver : 0,
          }));
          const melhorPacote = pacotesOficiais
            .filter((p) => p.silverEquiv > 0)
            .reduce((a, b) => (a.silverEquiv < b.silverEquiv ? a : b), { qty: 20, usd: 8, silverEquiv: 0 });

          // LC necessárias na semana (cada bundle = 15 LC)
          const bundlesNecessarios = expEntradas.reduce((acc, e) => acc + (e >= 1 ? 1 : 0) + (e >= 2 ? 1 : 0), 0);
          const lcNecessarias = bundlesNecessarios * 15;
          const lcFaltando = Math.max(0, lcNecessarias - luckCoinSaldo);
          const pacotesNecessarios = lcFaltando > 0 ? Math.ceil(lcFaltando / melhorPacote.qty) : 0;
          const lcSaldoRestante = luckCoinSaldo + pacotesNecessarios * melhorPacote.qty - lcNecessarias;
          const custoLCReal =
            lcFaltando > 0
              ? melhorPacote.silverEquiv > 0 && melhorPacote.silverEquiv < luckCoinSilver
                ? ((pacotesNecessarios * melhorPacote.usd) / questUSD) * questToSilver // loja oficial
                : lcFaltando * luckCoinSilver // mercado
              : 0;
          const mktMaisBarato = melhorPacote.silverEquiv === 0 || luckCoinSilver <= melhorPacote.silverEquiv;

          // Break-even por dia — só custo das EXTRAS (free é inevitável)
          const breakEvenDia = expEntradas.map((e, i) => {
            const custoExtras = (e >= 1 ? custoEntrada1 : 0) + (e >= 2 ? custoEntrada2 : 0);
            const gemaDia = expGemas[i];
            const pagou = gemaDia >= custoExtras;
            const sobra = gemaDia - custoExtras;
            return { custoExtras, gemaDia, pagou, sobra, temExtras: e > 0 };
          });

          // Custo semanal total (entradas)
          let custoTotalEntradas = 0;
          expEntradas.forEach((e) => {
            custoTotalEntradas += custoEntradaFree;
            if (e >= 1) custoTotalEntradas += custoEntrada1;
            if (e >= 2) custoTotalEntradas += custoEntrada2;
          });

          // QUEST da IM das expedições
          const totalGemasWeek = expGemas.reduce((a, b) => a + b, 0);
          const mediaGemasDay = totalGemasWeek / 7;
          const mediaGemasMes = mediaGemasDay * 30;

          const questExpSem = imExpSemana * poolRate;
          const questExpLiq = applySaque(applyExchQ(questExpSem, taxExchHunt));
          const usdExpSem = questExpLiq * questUSD;
          const usdExpMes = usdExpSem * (30 / 7);

          // ROI líquido
          const receitaSemana = totalGemasWeek + usdExpSem * questToSilver; // silver equiv total
          const lucroSemana = totalGemasWeek - custoTotalEntradas;
          const lucroMes = lucroSemana * (30 / 7);

          const dias = lang === "en" ? DIAS_SEMANA_EN : DIAS_SEMANA;

          return (
            <div>
              {/* FÓRMULAS */}
              <FormulaPanel
                lang={lang}
                title={lang === "en" ? "Expedition" : "Expedição"}
                descricao={
                  lang === "en"
                    ? "Tracks weekly gem silver income vs entry costs. Lucky Coin prices are compared between market and official store automatically. LC balance carries over weekly as leftover stock."
                    : "Registra o silver de gemas por semana vs custo das entradas. Preços de Lucky Coin são comparados entre mercado e loja oficial automaticamente. Saldo de LC é carregado como estoque da semana anterior."
                }
                formulas={[
                  {
                    label: lang === "en" ? "Munk Snack cost" : "Custo por Snack",
                    formula: "custoPorSnack = (preçoLC × 15) ÷ 10",
                    nota: "15 LC = 1 bundle = 10 snacks",
                  },
                  {
                    label: lang === "en" ? "Extra entry cost" : "Custo entrada extra",
                    formula: "1ª entrada = 12 snacks × custoPorSnack\n2ª entrada = 33 snacks × custoPorSnack",
                  },
                  {
                    label: lang === "en" ? "Break-even (extras only)" : "Break-even (só extras)",
                    formula: "pagou = silverGemas ≥ custoExtras (entrada free não conta)",
                  },
                  {
                    label: lang === "en" ? "LC balance" : "Saldo de LC",
                    formula: "lcSaldoRestante = saldoAtual + (pacotesComprados × qtdPacote) − lcNecessárias",
                  },
                  {
                    label: lang === "en" ? "QUEST from expedition IM" : "QUEST da IM de expedição",
                    formula: "QUEST = imExpSemana × poolRate → exchange 4% → saque 20%",
                  },
                ]}
              />
              <FormulaPanel
                title={lang === "en" ? "Expedition — How it's calculated" : "Expedição — Como é calculado"}
                descricao={
                  lang === "en"
                    ? "Tracks weekly gem silver (Thu→Thu), Lucky Coin costs for extra entries, and QUEST from Expedition IM. Break-even checks if gems paid for extra entries each day."
                    : "Registra silver de gemas semanalmente (Qui→Qui), custo de Lucky Coins para entradas extras e QUEST da IM de expedição. Break-even verifica se as gemas pagaram as entradas extras de cada dia."
                }
                formulas={[
                  {
                    label: lang === "en" ? "Munk Snack cost" : "Custo Munk Snack",
                    formula: "custoPorSnack = (preçoLC × 15) ÷ 10\n  [15 Lucky Coins = 1 bundle = 10 snacks]",
                  },
                  {
                    label: lang === "en" ? "Extra entry costs" : "Custo entradas extras",
                    formula:
                      "1ª entrada extra = 12 snacks × custoPorSnack\n2ª entrada extra = 33 snacks × custoPorSnack",
                  },
                  {
                    label: lang === "en" ? "Lucky Coin balance (leftovers)" : "Saldo de LC (sobras)",
                    formula:
                      "lcFaltando = max(0, lcNecessarias - saldoAtual)\npacotesNecessarios = ceil(lcFaltando ÷ melhorPacote.qty)\nsaldoRestante = saldoAtual + (pacotes × pacote.qty) - lcNecessarias",
                  },
                  {
                    label: lang === "en" ? "Daily break-even" : "Break-even diário",
                    formula:
                      "custoExtras = (e≥1 ? custoEntrada1 : 0) + (e≥2 ? custoEntrada2 : 0)\npagou = gemasDodia ≥ custoExtras\nsobra = gemasDodia - custoExtras",
                  },
                  {
                    label: lang === "en" ? "QUEST from IM" : "QUEST da IM",
                    formula:
                      "questBruto = imExpSemana × poolRate\nquestLiq   = applySaque(questBruto × (1 - exchFee))\nUSD/sem    = questLiq × questUSD",
                  },
                ]}
              />
              {/* ROI NO TOPO */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div
                  style={{
                    background: "rgba(196,160,80,0.07)",
                    border: "1px solid rgba(196,160,80,0.25)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: dim,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    {lang === "en" ? "Gems — Week" : "Gemas — Semana"}
                  </div>
                  <div style={{ color: gold, fontSize: 20, fontFamily: "'Space Mono',monospace", fontWeight: "bold" }}>
                    {fmtInt(totalGemasWeek)}
                  </div>
                  <div style={{ color: dim, fontSize: 9, marginTop: 4 }}>silver</div>
                </div>
                <div
                  style={{
                    background: "rgba(248,113,113,0.07)",
                    border: "1px solid rgba(248,113,113,0.25)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: dim,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    {lang === "en" ? "Entry Cost — Week" : "Custo Entradas — Semana"}
                  </div>
                  <div style={{ color: red, fontSize: 20, fontFamily: "'Space Mono',monospace", fontWeight: "bold" }}>
                    {fmtInt(custoTotalEntradas)}
                  </div>
                  <div style={{ color: dim, fontSize: 9, marginTop: 4 }}>silver</div>
                </div>
                <div
                  style={{
                    background: pc(lucroSemana) === green ? "rgba(74,222,128,0.07)" : "rgba(248,113,113,0.07)",
                    border: `1px solid ${pc(lucroSemana) === green ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
                    borderRadius: 12,
                    padding: "16px 18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: dim,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    {lang === "en" ? "Net Profit — Week" : "Lucro Líq. — Semana"}
                  </div>
                  <div
                    style={{
                      color: pc(lucroSemana),
                      fontSize: 20,
                      fontFamily: "'Space Mono',monospace",
                      fontWeight: "bold",
                    }}
                  >
                    {lucroSemana >= 0 ? "+" : ""}
                    {fmtInt(lucroSemana)}
                  </div>
                  <div style={{ color: dim, fontSize: 9, marginTop: 4 }}>silver</div>
                </div>
                <div
                  style={{
                    background: "rgba(167,139,250,0.07)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: dim,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    {lang === "en" ? "QUEST IM — Week" : "QUEST IM — Semana"}
                  </div>
                  <div
                    style={{ color: purple, fontSize: 20, fontFamily: "'Space Mono',monospace", fontWeight: "bold" }}
                  >
                    {fmt(questExpLiq, 2)}
                  </div>
                  <div style={{ color: dim, fontSize: 9, marginTop: 4 }}>≈ {fmtUSD(usdExpSem)}</div>
                </div>
              </div>

              {/* LUCKY COIN */}
              <Section
                title={lang === "en" ? "Lucky Coin — Cost Analysis" : "Lucky Coin — Análise de Custo"}
                icon="🪙"
                borderColor="rgba(196,160,80,0.4)"
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 6,
                      }}
                    >
                      {lang === "en" ? "Market Price (silver/coin)" : "Preço de Mercado (silver/coin)"}
                    </div>
                    <NumInput
                      value={luckCoinSilver}
                      onChange={setLuckCoinSilver}
                      min={0}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(196,160,80,0.3)",
                        borderRadius: 6,
                        color: gold,
                        padding: "8px 12px",
                        fontSize: 14,
                        width: "100%",
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <div style={{ fontSize: 10, color: dim, marginTop: 4 }}>
                      {lang === "en" ? "Price to buy 1 Lucky Coin on market" : "Preço de 1 Lucky Coin no mercado"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 6,
                      }}
                    >
                      {lang === "en" ? "Current LC Balance" : "Saldo Atual de LC"}
                    </div>
                    <NumInput
                      value={luckCoinSaldo}
                      onChange={setLuckCoinSaldo}
                      min={0}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(167,139,250,0.3)",
                        borderRadius: 6,
                        color: purple,
                        padding: "8px 12px",
                        fontSize: 14,
                        width: "100%",
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <div style={{ fontSize: 10, color: dim, marginTop: 4 }}>
                      {lang === "en" ? "LC available from previous weeks" : "LC disponíveis de semanas anteriores"}
                    </div>
                  </div>
                  <div
                    style={{
                      background: BG_CARD,
                      border: `1px solid ${lcFaltando > 0 ? "rgba(248,113,113,0.3)" : "rgba(74,222,128,0.3)"}`,
                      borderRadius: 8,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: dim,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 8,
                      }}
                    >
                      {lang === "en" ? "Weekly LC Summary" : "Resumo de LC da Semana"}
                    </div>
                    <div style={{ fontSize: 11, color: dim, lineHeight: 2 }}>
                      <div>
                        {lang === "en" ? "Need:" : "Precisa:"}{" "}
                        <span style={{ color: TEXT_PRIM, fontWeight: "bold" }}>{lcNecessarias} LC</span> (
                        {bundlesNecessarios} bundles)
                      </div>
                      <div>
                        {lang === "en" ? "Balance:" : "Saldo:"}{" "}
                        <span style={{ color: purple }}>{luckCoinSaldo} LC</span>
                      </div>
                      <div>
                        {lang === "en" ? "To buy:" : "Comprar:"}{" "}
                        <span style={{ color: lcFaltando > 0 ? orange : green }}>{lcFaltando} LC</span>
                        {lcFaltando > 0 && (
                          <span style={{ color: dim, fontSize: 9 }}>
                            {" "}
                            → {pacotesNecessarios}× {lang === "en" ? "pack of" : "pacote de"} {melhorPacote.qty}
                          </span>
                        )}
                      </div>
                      <div>
                        {lang === "en" ? "Leftover:" : "Sobra:"}{" "}
                        <span style={{ color: green, fontWeight: "bold" }}>{lcSaldoRestante} LC</span>{" "}
                        {lang === "en" ? "(next week)" : "(semana seguinte)"}
                      </div>
                    </div>
                    {lcFaltando > 0 && (
                      <div style={{ marginTop: 8, fontSize: 10, color: orange }}>
                        {lang === "en"
                          ? `Buy ${pacotesNecessarios}× ${melhorPacote.qty} LC pack${pacotesNecessarios > 1 ? "s" : ""} ($${melhorPacote.usd * pacotesNecessarios})`
                          : `Comprar ${pacotesNecessarios}× pacote de ${melhorPacote.qty} LC ($${melhorPacote.usd * pacotesNecessarios})`}
                      </div>
                    )}
                  </div>
                </div>

                {/* VEREDICTO — Onde comprar */}
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: TEXT_DIM,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 10,
                    }}
                  >
                    {lang === "en" ? "Where to buy Lucky Coins?" : "Onde comprar Lucky Coins?"}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {[
                      { qty: 20, usd: 8 },
                      { qty: 105, usd: 40 },
                      { qty: 550, usd: 200 },
                      { qty: 2275, usd: 800 },
                    ].map((p) => {
                      const usdPerCoin = p.usd / p.qty;
                      const silverEquiv = questUSD > 0 ? (usdPerCoin / questUSD) * questToSilver : 0;
                      const maisBarato = silverEquiv > 0 && silverEquiv < luckCoinSilver;
                      const mktMaisBarato = luckCoinSilver <= silverEquiv || silverEquiv === 0;
                      return (
                        <div
                          key={p.qty}
                          style={{
                            background: maisBarato ? "rgba(74,222,128,0.08)" : "rgba(0,0,0,0.2)",
                            border: `1px solid ${maisBarato ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.06)"}`,
                            borderRadius: 8,
                            padding: "12px 10px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              color: maisBarato ? green : dim,
                              fontSize: 10,
                              fontWeight: "bold",
                              marginBottom: 4,
                            }}
                          >
                            {p.qty} LC
                          </div>
                          <div
                            style={{
                              color: maisBarato ? green : TEXT_PRIM,
                              fontSize: 13,
                              fontFamily: "'Space Mono',monospace",
                              fontWeight: "bold",
                            }}
                          >
                            ${p.usd}
                          </div>
                          <div style={{ color: dim, fontSize: 9, marginTop: 2 }}>${usdPerCoin.toFixed(3)}/coin</div>
                          {silverEquiv > 0 && (
                            <div
                              style={{
                                color: maisBarato ? green : red,
                                fontSize: 9,
                                marginTop: 4,
                                fontWeight: maisBarato ? "bold" : "normal",
                              }}
                            >
                              ≈ {fmtInt(silverEquiv)} silver {maisBarato ? "✓ MAIS BARATO" : ""}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Veredicto final */}
                  {(() => {
                    const melhorPacote = [
                      { qty: 20, usd: 8 },
                      { qty: 105, usd: 40 },
                      { qty: 550, usd: 200 },
                      { qty: 2275, usd: 800 },
                    ]
                      .map((p) => ({
                        ...p,
                        silverEquiv: questUSD > 0 ? (p.usd / p.qty / questUSD) * questToSilver : 0,
                      }))
                      .filter((p) => p.silverEquiv > 0)
                      .reduce((a, b) => (a.silverEquiv < b.silverEquiv ? a : b), {
                        silverEquiv: Infinity,
                        qty: 0,
                        usd: 0,
                      });

                    const mktGanha = luckCoinSilver <= melhorPacote.silverEquiv;
                    return (
                      <div
                        style={{
                          marginTop: 10,
                          padding: "12px 16px",
                          background: mktGanha ? "rgba(96,165,250,0.08)" : "rgba(74,222,128,0.08)",
                          border: `1px solid ${mktGanha ? "rgba(96,165,250,0.25)" : "rgba(74,222,128,0.25)"}`,
                          borderRadius: 8,
                          fontSize: 11,
                          color: mktGanha ? blue : green,
                        }}
                      >
                        {mktGanha
                          ? lang === "en"
                            ? `✅ Buy on market — cheaper than the official store (${fmtInt(luckCoinSilver)} vs ${fmtInt(melhorPacote.silverEquiv)} silver/coin)`
                            : `✅ Compre no mercado — mais barato que a loja oficial (${fmtInt(luckCoinSilver)} vs ${fmtInt(melhorPacote.silverEquiv)} silver/coin)`
                          : lang === "en"
                            ? `✅ Buy from official store — ${melhorPacote.qty} LC pack for $${melhorPacote.usd} (≈ ${fmtInt(melhorPacote.silverEquiv)} silver/coin vs ${fmtInt(luckCoinSilver)} on market)`
                            : `✅ Compre na loja oficial — pacote de ${melhorPacote.qty} LC por $${melhorPacote.usd} (≈ ${fmtInt(melhorPacote.silverEquiv)} silver/coin vs ${fmtInt(luckCoinSilver)} no mercado)`}
                      </div>
                    );
                  })()}
                </div>

                {/* REVENDA DE LUCKY COINS */}
                <div
                  style={{
                    background: "rgba(167,139,250,0.05)",
                    border: "1px solid rgba(167,139,250,0.2)",
                    borderRadius: 10,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: purple,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: 12,
                    }}
                  >
                    💰 {lang === "en" ? "Lucky Coin Resell Analysis" : "Análise de Revenda de Lucky Coins"}
                  </div>
                  <div style={{ fontSize: 10, color: dim, marginBottom: 14, lineHeight: 1.7 }}>
                    {lang === "en"
                      ? "Buy from official store → Sell on market (−4% market fee). Is it profitable?"
                      : "Comprar na loja oficial → Vender no mercado (−4% taxa de mercado). Vale a pena?"}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {[
                      { qty: 20, usd: 8 },
                      { qty: 105, usd: 40 },
                      { qty: 550, usd: 200 },
                      { qty: 2275, usd: 800 },
                    ].map((p) => {
                      const custoUSD = p.usd;
                      const custoSilver = questUSD > 0 ? (custoUSD / questUSD) * questToSilver : 0;
                      const receitaBruta = luckCoinSilver * p.qty;
                      const receitaLiq = receitaBruta * 0.96; // 4% market fee
                      const lucro = receitaLiq - custoSilver;
                      const roi = custoSilver > 0 ? (lucro / custoSilver) * 100 : 0;
                      const compensa = lucro > 0;
                      return (
                        <div
                          key={p.qty}
                          style={{
                            background: compensa ? "rgba(74,222,128,0.07)" : "rgba(248,113,113,0.07)",
                            border: `1px solid ${compensa ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                            borderRadius: 8,
                            padding: "12px 10px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ color: dim, fontSize: 9, marginBottom: 6 }}>
                            {p.qty} LC · ${p.usd}
                          </div>
                          <div style={{ color: dim, fontSize: 9 }}>
                            {lang === "en" ? "Cost:" : "Custo:"} {custoSilver > 0 ? fmtInt(custoSilver) : "—"}{" "}
                            <span style={{ opacity: 0.5 }}>silver</span>
                          </div>
                          <div style={{ color: dim, fontSize: 9 }}>
                            {lang === "en" ? "Revenue (−4%):" : "Receita (−4%):"} {fmtInt(receitaLiq)}
                          </div>
                          <div
                            style={{
                              color: pc(lucro),
                              fontSize: 14,
                              fontWeight: "bold",
                              fontFamily: "'Space Mono',monospace",
                              marginTop: 6,
                            }}
                          >
                            {lucro >= 0 ? "+" : ""}
                            {custoSilver > 0 ? fmtInt(lucro) : "—"}
                          </div>
                          <div style={{ color: pc(roi), fontSize: 9, marginTop: 2 }}>
                            {custoSilver > 0 ? `ROI: ${roi >= 0 ? "+" : ""}${roi.toFixed(1)}%` : "—"}
                          </div>
                          <div style={{ color: compensa ? green : red, fontSize: 9, fontWeight: "bold", marginTop: 4 }}>
                            {custoSilver > 0
                              ? compensa
                                ? lang === "en"
                                  ? "✓ PROFIT"
                                  : "✓ LUCRO"
                                : lang === "en"
                                  ? "✗ LOSS"
                                  : "✗ PREJUÍZO"
                              : "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 10, color: dim, marginTop: 10, lineHeight: 1.6 }}>
                    ⚠️{" "}
                    {lang === "en"
                      ? "Resell profitability depends on your QUEST price and exchange rate. Update Market & Pool values to get accurate results."
                      : "A lucratividade de revenda depende do preço do QUEST e da taxa de câmbio. Atualize os valores de Mercado & Pool para resultados precisos."}
                  </div>
                </div>

                {/* Custo por entrada */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
                  {[
                    {
                      label: lang === "en" ? "Cost per Snack" : "Custo por Snack",
                      val: custoPorSnack,
                      hint: "15 LC = 1 bundle = 10 snacks",
                    },
                    {
                      label: lang === "en" ? "1st Extra Entry (12 snacks)" : "1ª Entrada Extra (12 snacks)",
                      val: custoEntrada1,
                      hint: "",
                    },
                    {
                      label: lang === "en" ? "2nd Extra Entry (33 snacks)" : "2ª Entrada Extra (33 snacks)",
                      val: custoEntrada2,
                      hint: "",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 8,
                        padding: "12px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 6,
                        }}
                      >
                        {c.label}
                      </div>
                      <div
                        style={{
                          color: orange,
                          fontSize: 14,
                          fontFamily: "'Space Mono',monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {fmtInt(c.val)}
                      </div>
                      <div style={{ color: dim, fontSize: 9, marginTop: 4 }}>silver{c.hint ? ` · ${c.hint}` : ""}</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* REGISTRO SEMANAL */}
              <Section
                title={lang === "en" ? "Weekly Record (Thu → Thu)" : "Registro Semanal (Qui → Qui)"}
                icon="📅"
                borderColor="rgba(96,165,250,0.4)"
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr>
                        {[
                          lang === "en" ? "Day" : "Dia",
                          lang === "en" ? "Gem Silver" : "Silver Gemas",
                          lang === "en" ? "Extra Entries" : "Entradas Extras",
                          lang === "en" ? "Extra Cost" : "Custo Extras",
                          lang === "en" ? "Extras paid off?" : "Extras se pagaram?",
                          lang === "en" ? "Net (gems - cost)" : "Líquido (gemas - custo)",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              color: gold,
                              padding: "8px 12px",
                              fontSize: 9,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              borderBottom: "1px solid rgba(196,160,80,0.2)",
                              textAlign: "center",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dias.map((dia, i) => {
                        const entradas = expEntradas[i];
                        const custoDia =
                          custoEntradaFree + (entradas >= 1 ? custoEntrada1 : 0) + (entradas >= 2 ? custoEntrada2 : 0);
                        const liquidoDia = expGemas[i] - custoDia;
                        const be = breakEvenDia[i];
                        return (
                          <tr key={dia}>
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                color: blue,
                                fontWeight: "bold",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              {dia}
                            </td>
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              <NumInput
                                value={expGemas[i]}
                                onChange={(v) => setExpGemas((p) => p.map((x, j) => (j === i ? v : x)))}
                                min={0}
                                style={{
                                  background: "rgba(0,0,0,0.4)",
                                  border: "1px solid rgba(196,160,80,0.2)",
                                  borderRadius: 5,
                                  color: gold,
                                  padding: "5px 10px",
                                  fontSize: 12,
                                  width: 130,
                                  fontFamily: "'Space Mono',monospace",
                                  outline: "none",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                                {[0, 1, 2].map((n) => (
                                  <button
                                    key={n}
                                    onClick={() => setExpEntradas((p) => p.map((x, j) => (j === i ? n : x)))}
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: 5,
                                      background: entradas === n ? "rgba(96,165,250,0.2)" : "rgba(0,0,0,0.3)",
                                      border: `1px solid ${entradas === n ? "rgba(96,165,250,0.5)" : "rgba(255,255,255,0.07)"}`,
                                      color: entradas === n ? blue : dim,
                                      cursor: "pointer",
                                      fontFamily: "'Space Mono',monospace",
                                      fontSize: 10,
                                      fontWeight: entradas === n ? "bold" : "normal",
                                    }}
                                  >
                                    {n}
                                  </button>
                                ))}
                              </div>
                            </td>
                            {/* Custo apenas das EXTRAS */}
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                color: be.temExtras ? red : dim,
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              {be.temExtras ? fmtInt(be.custoExtras) : "—"}
                            </td>
                            {/* Break-even das extras */}
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              {!be.temExtras ? (
                                <span style={{ color: dim, fontSize: 10 }}>—</span>
                              ) : expGemas[i] === 0 ? (
                                <span style={{ color: dim, fontSize: 10 }}>
                                  {lang === "en" ? "no gems" : "sem gemas"}
                                </span>
                              ) : (
                                <div>
                                  <div style={{ color: be.pagou ? green : red, fontWeight: "bold", fontSize: 11 }}>
                                    {be.pagou ? "✅" : "❌"}{" "}
                                    {be.pagou
                                      ? lang === "en"
                                        ? "PAID OFF"
                                        : "COMPENSOU"
                                      : lang === "en"
                                        ? "NOT YET"
                                        : "NÃO PAGOU"}
                                  </div>
                                  <div style={{ color: pc(be.sobra), fontSize: 9, marginTop: 2 }}>
                                    {be.sobra >= 0 ? "+" : ""}
                                    {fmtInt(be.sobra)} silver
                                  </div>
                                </div>
                              )}
                            </td>
                            {/* Líquido total (gemas - custo total incluindo free) */}
                            <td
                              style={{
                                padding: "8px 12px",
                                textAlign: "center",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              {expGemas[i] > 0 ? (
                                <div>
                                  <div style={{ color: pc(liquidoDia), fontWeight: "bold" }}>
                                    {liquidoDia >= 0 ? "+" : ""}
                                    {fmtInt(liquidoDia)}
                                  </div>
                                  <div style={{ color: liquidoDia > 0 ? green : red, fontSize: 9, marginTop: 2 }}>
                                    {fmtUSD(toUSD(Math.max(0, liquidoDia), taxExchHunt, taxSaqueAtivo))}
                                  </div>
                                </div>
                              ) : (
                                <span style={{ color: dim }}>—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {/* Totais */}
                      <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                        <td
                          style={{
                            padding: "10px 12px",
                            color: gold,
                            fontWeight: "bold",
                            fontSize: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Total
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: gold, fontWeight: "bold" }}>
                          {fmtInt(totalGemasWeek)}
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: dim, fontSize: 10 }}>
                          {expEntradas.reduce((a, b) => a + b, 0)} extras
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: red, fontWeight: "bold" }}>
                          {fmtInt(breakEvenDia.reduce((a, b) => a + b.custoExtras, 0))}
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: dim, fontSize: 10 }}>
                          {breakEvenDia.filter((b) => b.temExtras && b.pagou).length}/
                          {breakEvenDia.filter((b) => b.temExtras).length}{" "}
                          {lang === "en" ? "days paid off" : "dias compensaram"}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            textAlign: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          <div style={{ color: pc(lucroSemana), fontWeight: "bold" }}>
                            {lucroSemana >= 0 ? "+" : ""}
                            {fmtInt(lucroSemana)}
                          </div>
                          <div style={{ color: lucroSemana > 0 ? green : red, fontSize: 9, marginTop: 2 }}>
                            {fmtUSD(toUSD(Math.max(0, lucroSemana), taxExchHunt, taxSaqueAtivo))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Projeções */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
                  {[
                    { label: lang === "en" ? "Daily Average" : "Média Diária", val: mediaGemasDay, color: blue },
                    { label: lang === "en" ? "Weekly Total" : "Total Semanal", val: totalGemasWeek, color: gold },
                    { label: lang === "en" ? "Monthly Avg" : "Média Mensal", val: mediaGemasMes, color: purple },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 8,
                        padding: "12px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 6,
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        style={{
                          color: s.color,
                          fontSize: 16,
                          fontFamily: "'Space Mono',monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {fmtInt(s.val)}
                      </div>
                      <div style={{ color: dim, fontSize: 9, marginTop: 2 }}>silver</div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* IM E QUEST */}
              <Section
                title={lang === "en" ? "Expedition IM & QUEST" : "IM & QUEST da Expedição"}
                icon="⚡"
                borderColor="rgba(167,139,250,0.4)"
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <Field
                    label={lang === "en" ? "Expedition IM/week" : "IM Expedição/semana"}
                    value={imExpSemana}
                    onChange={setImExpSemana}
                    step={100000}
                    suffix="IM"
                    color={blue}
                    hint={lang === "en" ? "From Jewels collected in runs" : "Jewels coletadas nas runs"}
                  />
                  <div
                    style={{
                      background: BG_CARD,
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: 8,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: dim,
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                      }}
                    >
                      {lang === "en" ? "QUEST from IM" : "QUEST da IM"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div>
                        <div style={{ color: dim, fontSize: 9 }}>{lang === "en" ? "Gross/week" : "Bruto/sem"}</div>
                        <div style={{ color: purple, fontSize: 14, fontWeight: "bold" }}>{fmt(questExpSem, 4)}</div>
                      </div>
                      <div>
                        <div style={{ color: dim, fontSize: 9 }}>{lang === "en" ? "Net/week" : "Líquido/sem"}</div>
                        <div style={{ color: green, fontSize: 14, fontWeight: "bold" }}>{fmt(questExpLiq, 4)}</div>
                      </div>
                      <div>
                        <div style={{ color: dim, fontSize: 9 }}>USD/sem</div>
                        <div style={{ color: green, fontSize: 14, fontWeight: "bold" }}>{fmtUSD(usdExpSem)}</div>
                      </div>
                      <div>
                        <div style={{ color: dim, fontSize: 9 }}>USD/mês</div>
                        <div style={{ color: green, fontSize: 14, fontWeight: "bold" }}>{fmtUSD(usdExpMes)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Joias — informativo */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: dim,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    💎 {lang === "en" ? "Jewels (informational only)" : "Joias (apenas informativo)"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <NumInput
                      value={expJoias}
                      onChange={setExpJoias}
                      min={0}
                      style={{
                        background: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 6,
                        color: TEXT_DIM,
                        padding: "6px 12px",
                        fontSize: 14,
                        width: 160,
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <span style={{ color: dim, fontSize: 10, lineHeight: 1.6 }}>
                      {lang === "en"
                        ? "Jewels feed IM and the leaderboard ranking. Rate unknown — not used in calculations."
                        : "Joias alimentam a IM e o ranking de expedições. Taxa desconhecida — não afeta os cálculos."}
                    </span>
                  </div>
                </div>
              </Section>
            </div>
          );
        })()}

      {tab === "mercado" && (
        <div>
          <FormulaPanel
            lang={lang}
            title={lang === "en" ? "Materials" : "Materiais"}
            descricao={
              lang === "en"
                ? "A single shared price list for every material used across all Tradepacks. Prices set here are market-only — production/farming cost is configured per pack in the Tradepack tab's 'Pack materials' table, since it's specific to how you personally source each item."
                : "Uma lista de preços única e compartilhada pra todo material usado nos Tradepacks. Os preços aqui são só de mercado — o custo de produção/plantação é configurado por pack, na tabela 'Materiais do pack' da aba Tradepack, já que é específico de como você produz cada item."
            }
            formulas={[
              {
                label: lang === "en" ? "Shared market price" : "Preço de mercado compartilhado",
                formula: "matsOverride[material].precoMkt → usado em TODOS os packs que contêm esse material",
                nota:
                  lang === "en"
                    ? "Editing a price here updates it everywhere the material appears, including the Tradepack tab."
                    : "Editar um preço aqui atualiza em todo lugar que o material aparece, incluindo a aba Tradepack.",
              },
            ]}
          />

          <Section
            title={`🌐 ${TR[lang].tabMateriais}`}
            icon="🌐"
            borderColor="rgba(96,165,250,0.3)"
          >
            <div style={{ color: "rgba(143,160,184,0.6)", fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>
              {lang === "en"
                ? "Set a material's market price once here and it automatically updates in every pack that uses it — no need to re-enter prices per pack. Only market price lives here; production/farming cost is set per pack in the Tradepack tab."
                : "Preencha o preço de mercado de um material aqui uma única vez e ele atualiza automaticamente em todos os packs que o utilizam — sem precisar repetir por pack. Só o preço de mercado fica aqui; o custo de produção/plantação é definido por pack, na aba Tradepack."}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="text"
                value={matGlobalSearch}
                onChange={(e) => setMatGlobalSearch(e.target.value)}
                placeholder={lang === "en" ? "🔍 Search material..." : "🔍 Buscar material..."}
                style={{
                  flex: "1 1 220px",
                  boxSizing: "border-box",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(96,165,250,0.25)",
                  borderRadius: 8,
                  color: TEXT_PRIM,
                  padding: "8px 12px",
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  outline: "none",
                }}
              />
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: dim,
                  fontSize: 11,
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={matGlobalOnlyEmpty}
                  onChange={(e) => setMatGlobalOnlyEmpty(e.target.checked)}
                />
                {lang === "en" ? "Only missing prices" : "Só sem preço"}
              </label>
              <div style={{ color: "rgba(143,160,184,0.5)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>
                {ALL_PACK_MATERIALS.length} {lang === "en" ? "unique materials" : "materiais únicos"}
              </div>
            </div>

            <div
              style={{
                marginBottom: 6,
                display: "grid",
                gridTemplateColumns: "1.4fr 0.7fr 0.9fr 60px",
                gap: 4,
                position: "sticky",
                top: 0,
              }}
            >
              {[
                lang === "en" ? "Material" : "Material",
                lang === "en" ? "Used in" : "Usado em",
                lang === "en" ? "Market" : "Mercado",
                "QUEST -20%",
              ].map((h) => (
                <span key={h} style={{ color: dim, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {h}
                </span>
              ))}
            </div>

            <div style={{ maxHeight: 420, overflowY: "auto", paddingRight: 4 }}>
              {ALL_PACK_MATERIALS.filter((mat) => {
                if (matGlobalSearch.trim() && !mat.nome.toLowerCase().includes(matGlobalSearch.trim().toLowerCase()))
                  return false;
                if (matGlobalOnlyEmpty && getMat(mat.nome, "precoMkt") > 0) return false;
                return true;
              }).map((mat) => (
                <div
                  key={mat.nome}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.7fr 0.9fr 60px",
                    gap: 4,
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ color: "#c0c0d0", fontSize: 12 }}>{mat.nome}</span>
                  <span
                    style={{ color: "rgba(143,160,184,0.55)", fontSize: 10 }}
                    title={mat.packs.join(", ")}
                  >
                    {mat.packs.length} {lang === "en" ? "pack(s)" : "pack(s)"}
                  </span>
                  <NumInput
                    value={getMat(mat.nome, "precoMkt")}
                    onChange={(v) => setMat(mat.nome, "precoMkt", v)}
                    min={0}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(96,165,250,0.4)",
                      borderRadius: 6,
                      color: blue,
                      padding: "4px 8px",
                      fontSize: 12,
                      width: "100%",
                      fontFamily: "'Space Mono', monospace",
                      outline: "none",
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <div
                      onClick={() => toggleQUEST(mat.nome)}
                      title={lang === "en" ? "Buy with QUEST (-20%)" : "Comprar com QUEST (-20%)"}
                      style={{
                        display: "inline-block",
                        width: 30,
                        height: 18,
                        borderRadius: 9,
                        background: matsQUEST[mat.nome] ? "#c4a050" : "#303040",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: matsQUEST[mat.nome] ? 14 : 2,
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#f0e6c8",
                          transition: "left 0.2s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === "crafting" &&
        (() => {
          const extraTaxPct = Math.min(100, Math.floor(craftOversupply / 10) * 2);
          const todosItens = CRAFTING_DB[craftProfTab] || [];
          const itens = todosItens.filter(
            (i) => !craftSubcat || craftSubcat === "all" || (i.subcategoria || "Geral") === craftSubcat
          );

          // Subcategorias derivadas da lista COMPLETA (não filtrada)
          const subcats = [...new Set(todosItens.map((i) => i.subcategoria || "Geral"))];

          // Cheapest gemstone helper
          const cheapestGem = () => {
            const entries = Object.entries(gemPrices).filter(([, v]) => v > 0);
            if (!entries.length) return { nome: "—", preco: 0 };
            return entries.reduce((a, b) => (a[1] < b[1] ? a : b), entries[0]).reduce
              ? { nome: entries[0][0], preco: entries[0][1] }
              : (() => {
                  const [nome, preco] = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
                  return { nome, preco };
                })();
          };

          const isGuildPlan = guildPlan === "guild" || guildPlan === "friends";
          const getMatPreco = (mat) => {
            if (typeof mat === "object") {
              if (mat.isGemstone) return cheapestGem().preco;
              const key = craftProfTab + "|" + mat.nome;
              return (isGuildPlan && guildPrices[key] !== undefined ? guildPrices[key] : craftMaterialPrices[key]) || 0;
            }
            const key = craftProfTab + "|" + mat;
            return (isGuildPlan && guildPrices[key] !== undefined ? guildPrices[key] : craftMaterialPrices[key]) || 0;
          };
          const setMatPreco = (nome, val) => {
            const key = craftProfTab + "|" + nome;
            setCraftMaterialPrices((p) => ({ ...p, [key]: val }));
            if (isGuildPlan) updateGuildPrice(key, val);
          };
          const getCraftPrice = (nome) => craftPrices[craftProfTab + "|" + nome] || 0;
          const setCraftPrice = (nome, val) => setCraftPrices((p) => ({ ...p, [craftProfTab + "|" + nome]: val }));

          // Materiais únicos (excluindo isGemstone — exibidos separadamente)
          const matsUnicos = [
            ...new Set(itens.flatMap((i) => i.materiais.filter((m) => !m.isGemstone).map((m) => m.nome))),
          ].sort();

          // ── Tax QUEST por item ────────────────────────────────────────────────
          const tqKey = (itemNome) => `${craftProfTab}|${itemNome}|taxQUEST`;
          const isTaxQUEST = (itemNome) => taxQUESTToggles[tqKey(itemNome)] || false;
          const toggleTQ = (itemNome) => setTaxQUESTToggles((p) => ({ ...p, [tqKey(itemNome)]: !p[tqKey(itemNome)] }));
          const calcTaxQUEST = (taxSilver) => (taxSilver * (1 - taxQUESTDesconto / 100)) / questToSilver;

          // ── Sub-craft helpers ────────────────────────────────────────────────
          // Procura a receita de um material em qualquer profissão do DB
          const findRecipe = (matNome) => {
            for (const prof of Object.keys(CRAFTING_DB)) {
              const r = CRAFTING_DB[prof].find((i) => i.nome === matNome);
              if (r) return { recipe: r, prof };
            }
            return null;
          };

          // Chave única do toggle por item+material
          const scKey = (itemNome, matNome) => `${craftProfTab}|${itemNome}|${matNome}`;
          const isSubcraft = (itemNome, matNome) => subcraftToggles[scKey(itemNome, matNome)] || false;
          const toggleSC = (itemNome, matNome) =>
            setSubcraftToggles((p) => ({
              ...p,
              [scKey(itemNome, matNome)]: !p[scKey(itemNome, matNome)],
            }));

          // Calcula custo e EXP de sub-craftar um material
          const calcSubcraft = (matNome, qtdNecessaria) => {
            const found = findRecipe(matNome);
            if (!found) return null;
            const { recipe, prof } = found;
            const custoMatSub = recipe.materiais.reduce((acc, m) => {
              const preco = m.isGemstone
                ? cheapestGem().preco
                : craftMaterialPrices[prof + "|" + m.nome] || craftMaterialPrices[craftProfTab + "|" + m.nome] || 0;
              return acc + m.qtd * preco;
            }, 0);
            const craftsNeeded = Math.ceil(qtdNecessaria / recipe.qty);
            const proporcao = qtdNecessaria / recipe.qty;
            const custoUm = custoMatSub + recipe.baseTax;
            return {
              custo: proporcao * custoUm, // proporcional (sobras guardadas)
              exp: craftsNeeded * recipe.exp, // EXP de crafts completos
              craftsNeeded,
              proporcao,
              recipe,
              prof,
              custoUm,
            };
          };

          const calc = itens.map((item) => {
            let custoMateriais = 0;
            let expSubcrafts = 0;
            const subcraftInfo = {}; // { matNome: { custo, exp, craftsNeeded } }

            item.materiais.forEach((m) => {
              if (isSubcraft(item.nome, m.nome)) {
                const sc = calcSubcraft(m.nome, m.qtd);
                if (sc) {
                  custoMateriais += sc.custo;
                  expSubcrafts += sc.exp;
                  subcraftInfo[m.nome] = sc;
                  return;
                }
              }
              custoMateriais += m.qtd * getMatPreco(m);
            });

            const expTotal = item.exp + expSubcrafts;
            const taxBase = item.baseTax * (1 + extraTaxPct / 100);
            const taxQUESTAtivo = isTaxQUEST(item.nome);
            // Modo QUEST: desconto de taxQUESTDesconto% na tax, pago em QUEST
            const taxSilver = taxQUESTAtivo ? 0 : taxBase;
            const taxQUEST_valor = taxQUESTAtivo ? (taxBase * (1 - taxQUESTDesconto / 100)) / questToSilver : 0;
            // Para custoTotal comparativo, convertemos taxQUEST de volta para silver equivalente
            const taxReal = taxQUESTAtivo ? taxBase * (1 - taxQUESTDesconto / 100) : taxBase;
            const custoTotal = custoMateriais + taxReal;
            const precoVenda = getCraftPrice(item.nome);
            const receitaTotal = applyMkt(precoVenda * item.qty, taxMktCrafting);
            const temDados = precoVenda > 0 && custoMateriais > 0;
            const margem = temDados ? receitaTotal - custoTotal : null;
            const margemPct = margem !== null && custoTotal > 0 ? (margem / custoTotal) * 100 : null;
            const margemEXP = margem !== null && expTotal > 0 ? margem / expTotal : null;

            const threshold = 10000 + 10000 * craftPlayerLevel;
            const expRestante100 = threshold * Math.max(0, (100 - craftOversupply) / 100);
            const expRestanteMax = threshold * Math.max(0, (500 - craftOversupply) / 100);
            const craftsParaOS = expTotal > 0 ? Math.ceil(expRestante100 / expTotal) : null;
            const craftsParaMax = expTotal > 0 ? Math.ceil(expRestanteMax / expTotal) : null;
            const profitAteOS = margem !== null && craftsParaOS !== null ? margem * craftsParaOS : null;
            const profitAteMax = margem !== null && craftsParaMax !== null ? margem * craftsParaMax : null;

            // Custo total acumulado até OS / MAX (inclui sub-crafts)
            const custoAteOS = craftsParaOS !== null ? custoTotal * craftsParaOS : null;
            const custoAteMax = craftsParaMax !== null ? custoTotal * craftsParaMax : null;

            return {
              ...item,
              custoMateriais,
              expTotal,
              expSubcrafts,
              subcraftInfo,
              taxReal,
              taxSilver,
              taxQUEST_valor,
              taxQUESTAtivo,
              custoTotal,
              precoVenda,
              receitaTotal,
              temDados,
              margem,
              margemPct,
              margemEXP,
              craftsParaOS,
              craftsParaMax,
              profitAteOS,
              profitAteMax,
              custoAteOS,
              custoAteMax,
            };
          });

          const comDados = calc.filter((i) => i.temDados);
          const topMargem = [...comDados].sort((a, b) => b.margem - a.margem).slice(0, 3);
          const topPct = [...comDados].sort((a, b) => b.margemPct - a.margemPct).slice(0, 3);
          const topEXP = [...comDados].sort((a, b) => b.margemEXP - a.margemEXP).slice(0, 3);

          const allMatsFilled = matsUnicos.length > 0 && matsUnicos.every((m) => getMatPreco(m) > 0);

          return (
            <div>
              <Section title="Crafting — Oversupply Calculator" icon="⚒️" borderColor="rgba(196,160,80,0.4)">
                {/* FÓRMULAS */}
                <FormulaPanel
                  lang={lang}
                  title="Crafting / Oversupply"
                  descricao={
                    lang === "en"
                      ? "Calculates craft cost, market margin, EXP per craft, and how many crafts are needed to reach Oversupply (100%) or MAX (500%). Sub-crafting allows you to calculate the cost of producing a material instead of buying it."
                      : "Calcula custo de craft, margem de mercado, EXP por craft e quantos crafts são necessários para atingir o Oversupply (100%) ou MAX (500%). Sub-craft permite calcular o custo de produzir um material em vez de comprá-lo."
                  }
                  formulas={[
                    {
                      label: lang === "en" ? "Craft cost" : "Custo do craft",
                      formula: "custoTotal = custoMateriais + taxBase × (1 + oversupply%)",
                    },
                    {
                      label: lang === "en" ? "Tax in QUEST mode" : "Tax modo QUEST",
                      formula: "taxQUEST = (taxBase × 0.80) ÷ questToSilver  ← 20% discount",
                    },
                    {
                      label: "Silver/EXP",
                      formula: "silverEXP = margem ÷ expTotal",
                      nota: lang === "en" ? "Lower = more EXP per silver spent" : "Menor = mais EXP por silver gasto",
                    },
                    {
                      label: lang === "en" ? "EXP threshold" : "Threshold de EXP",
                      formula: "threshold = 10.000 + 10.000 × níveldoPlayer",
                    },
                    {
                      label: lang === "en" ? "Crafts to OS" : "Crafts até OS",
                      formula: "craftsOS = ⌈threshold × (100 − oversupplyAtual%) ÷ expPorCraft⌉",
                    },
                    {
                      label: lang === "en" ? "Sub-craft cost" : "Custo sub-craft",
                      formula:
                        "custoSubcraft = (qtdNecessária ÷ qtdProduzida) × (custoMateriais + tax)\nEXP = ⌈qtdNecessária ÷ qtdProduzida⌉ × expDaReceita",
                    },
                  ]}
                />
                {/* BANNER GUILDA */}
                {guildId && (guildPlan === "guild" || guildPlan === "friends") && (
                  <div
                    style={{
                      background: "rgba(96,165,250,0.07)",
                      border: "1px solid rgba(96,165,250,0.2)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontSize: 11, color: blue }}>
                      🔗{" "}
                      {lang === "en"
                        ? `${guildPlan === "guild" ? "Guild" : "Friends"} mode — material prices are shared in real time with all members`
                        : `Modo ${guildPlan === "guild" ? "Guilda" : "Amigos"} — preços de materiais sincronizados em tempo real com todos os membros`}
                    </div>
                    {guildSyncing && (
                      <span style={{ color: gold, fontSize: 10 }}>
                        ⟳ {lang === "en" ? "syncing..." : "sincronizando..."}
                      </span>
                    )}
                  </div>
                )}

                {/* CONFIG TOPO */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr auto",
                    gap: 16,
                    marginBottom: 20,
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Nível do Player
                    </div>
                    <NumInput
                      value={craftPlayerLevel}
                      onChange={(v) => setCraftPlayerLevel(Math.max(1, Math.min(100, v)))}
                      min={1}
                      max={100}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(196,160,80,0.3)",
                        borderRadius: 6,
                        color: TEXT_PRIM,
                        padding: "8px 12px",
                        fontSize: 14,
                        width: "100%",
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 4 }}>
                      Threshold: {fmtInt(10000 + 10000 * craftPlayerLevel)} EXP
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Oversupply Atual (%)
                    </div>
                    <NumInput
                      value={craftOversupply}
                      onChange={(v) => setCraftOversupply(Math.max(0, Math.min(500, v)))}
                      min={0}
                      max={500}
                      style={{
                        background: BG_CARD,
                        border: `1px solid ${craftOversupply >= 200 ? "rgba(248,113,113,0.5)" : craftOversupply >= 100 ? "rgba(251,146,60,0.5)" : "rgba(74,222,128,0.4)"}`,
                        borderRadius: 6,
                        color: craftOversupply >= 200 ? red : craftOversupply >= 100 ? orange : green,
                        padding: "8px 12px",
                        fontSize: 14,
                        width: "100%",
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 10,
                        color: craftOversupply >= 200 ? red : craftOversupply >= 100 ? orange : green,
                        marginTop: 4,
                      }}
                    >
                      Tax extra: +{extraTaxPct}%{" "}
                      {craftOversupply === 0 ? TR[lang].osPenalty : craftOversupply >= 500 ? "🔴 MAX" : ""}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {lang === "en" ? "QUEST tax discount (%)" : "Desconto tax QUEST (%)"}
                    </div>
                    <NumInput
                      value={taxQUESTDesconto}
                      onChange={(v) => setTaxQUESTDesconto(Math.max(0, Math.min(100, v)))}
                      min={0}
                      max={100}
                      style={{
                        background: BG_CARD,
                        border: "1px solid rgba(167,139,250,0.3)",
                        borderRadius: 6,
                        color: purple,
                        padding: "8px 12px",
                        fontSize: 14,
                        width: "100%",
                        fontFamily: "'Space Mono',monospace",
                        outline: "none",
                      }}
                    />
                    <div style={{ fontSize: 10, color: "rgba(167,139,250,0.5)", marginTop: 4 }}>
                      {lang === "en" ? "Click S/Q per row to toggle" : "Clique S/Q por linha para alternar"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: TEXT_DIM,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      Profissão
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {Object.keys(CRAFTING_DB).map((p) => {
                        const emDesenv = !["Blacksmithing", "Cooking"].includes(p);
                        return (
                          <button
                            key={p}
                            onClick={() => {
                              if (!emDesenv) {
                                setCraftProfTab(p);
                                setCraftSubcat("all");
                              }
                            }}
                            style={{
                              background:
                                craftProfTab === p
                                  ? `linear-gradient(135deg, ${gold}, #8a6a20)`
                                  : emDesenv
                                    ? "rgba(0,0,0,0.15)"
                                    : BG_CARD,
                              border: `1px solid ${craftProfTab === p ? gold : emDesenv ? "rgba(255,255,255,0.04)" : "rgba(196,160,80,0.2)"}`,
                              borderRadius: 6,
                              color: craftProfTab === p ? "#000" : emDesenv ? "rgba(255,255,255,0.2)" : TEXT_DIM,
                              padding: "5px 12px",
                              cursor: emDesenv ? "not-allowed" : "pointer",
                              fontFamily: "'Space Mono',monospace",
                              fontSize: 10,
                              fontWeight: craftProfTab === p ? "bold" : "normal",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                              opacity: emDesenv ? 0.5 : 1,
                            }}
                          >
                            {PROF_ICONS[p]} {p}
                            {emDesenv ? " 🔒" : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* RANKINGS */}
                {comDados.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                    <div
                      style={{
                        background: "rgba(74,222,128,0.06)",
                        border: "1px solid rgba(74,222,128,0.25)",
                        borderRadius: 10,
                        padding: "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          color: green,
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        🏆 Maior Margem Líquida
                      </div>
                      {topMargem.map((i, idx) => (
                        <div key={i.nome} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              color: idx === 0 ? green : TEXT_DIM,
                              fontSize: 11,
                              fontWeight: idx === 0 ? "bold" : "normal",
                            }}
                          >
                            #{idx + 1} {i.nome}
                          </div>
                          <div style={{ color: pc(i.margem), fontSize: 13, fontWeight: "bold" }}>
                            {i.margem >= 0 ? "+" : ""}
                            {fmtInt(i.margem)} silver
                          </div>
                          <div style={{ color: TEXT_DIM, fontSize: 10 }}>por craft ({i.qty}un)</div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: "rgba(96,165,250,0.06)",
                        border: "1px solid rgba(96,165,250,0.25)",
                        borderRadius: 10,
                        padding: "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          color: blue,
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        📈 Maior Margem %
                      </div>
                      {topPct.map((i, idx) => (
                        <div key={i.nome} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              color: idx === 0 ? blue : TEXT_DIM,
                              fontSize: 11,
                              fontWeight: idx === 0 ? "bold" : "normal",
                            }}
                          >
                            #{idx + 1} {i.nome}
                          </div>
                          <div style={{ color: pc(i.margemPct), fontSize: 13, fontWeight: "bold" }}>
                            {i.margemPct >= 0 ? "+" : ""}
                            {fmt(i.margemPct, 1)}%
                          </div>
                          <div style={{ color: TEXT_DIM, fontSize: 10 }}>sobre custo total</div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: "rgba(167,139,250,0.06)",
                        border: "1px solid rgba(167,139,250,0.25)",
                        borderRadius: 10,
                        padding: "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          color: purple,
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        ⚡ Melhor por EXP
                      </div>
                      {topEXP.map((i, idx) => (
                        <div key={i.nome} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              color: idx === 0 ? purple : TEXT_DIM,
                              fontSize: 11,
                              fontWeight: idx === 0 ? "bold" : "normal",
                            }}
                          >
                            #{idx + 1} {i.nome}
                          </div>
                          <div style={{ color: idx === 0 ? purple : TEXT_DIM, fontSize: 13, fontWeight: "bold" }}>
                            {fmt(i.margemEXP, 2)} silver/EXP
                          </div>
                          <div style={{ color: TEXT_DIM, fontSize: 10 }}>{i.exp} EXP por craft</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PREÇOS DE MATERIAIS */}
                {/* GEMSTONES — só exibe se a profissão tem Gemstone Dust */}
                {itens.some((i) => i.materiais.some((m) => m.isGemstone)) && (
                  <div
                    style={{
                      background: "rgba(167,139,250,0.06)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: 10,
                      padding: "14px 18px",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: purple,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      💎{" "}
                      {lang === "en"
                        ? "Gemstone Prices — cheapest used automatically in Gemstone Dust"
                        : "Preços das Joias — a mais barata é usada automaticamente no Gemstone Dust"}
                    </div>
                    <div
                      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}
                    >
                      {GEMSTONE_NAMES.map((gem) => {
                        const filled = Object.entries(gemPrices).filter(([, v]) => v > 0);
                        const isCheapest =
                          filled.length > 0 && gem === filled.reduce((a, b) => (a[1] < b[1] ? a : b))[0];
                        return (
                          <div
                            key={gem}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              background: isCheapest ? "rgba(167,139,250,0.12)" : BG_SURFACE,
                              border: `1px solid ${isCheapest ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.05)"}`,
                              borderRadius: 7,
                              padding: "6px 10px",
                            }}
                          >
                            <div style={{ flex: 1, fontSize: 11, color: isCheapest ? purple : TEXT_DIM }}>
                              {gem}
                              {isCheapest && " ✓"}
                            </div>
                            <NumInput
                              value={gemPrices[gem]}
                              onChange={(v) => setGemPrices((p) => ({ ...p, [gem]: v }))}
                              min={0}
                              style={{
                                background: "rgba(0,0,0,0.4)",
                                border: "1px solid rgba(167,139,250,0.2)",
                                borderRadius: 4,
                                color: purple,
                                padding: "4px 8px",
                                fontSize: 11,
                                width: 80,
                                fontFamily: "'Space Mono',monospace",
                                outline: "none",
                                textAlign: "right",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {Object.values(gemPrices).every((v) => v === 0) && (
                      <div style={{ fontSize: 10, color: red, marginTop: 8 }}>
                        ⚠️{" "}
                        {lang === "en"
                          ? "Enter at least one gemstone price to calculate Gemstone Dust cost"
                          : "Insira ao menos uma joia para calcular o custo do Gemstone Dust"}
                      </div>
                    )}
                  </div>
                )}

                <Divider label={`${PROF_ICONS[craftProfTab]} Preços de materiais — ${craftProfTab}`} />
                <div
                  style={{
                    background: BG_CARD,
                    border: "1px solid rgba(96,165,250,0.1)",
                    borderRadius: 10,
                    padding: "14px 18px",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 14, lineHeight: 1.7 }}>
                    {lang === "en"
                      ? "💡 Enter the market price of each material. Values are automatically applied to all recipes that use that material."
                      : "💡 Insira o preço de mercado de cada material. Os valores são aplicados automaticamente a todas as receitas que usam esse material."}
                  </div>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}
                  >
                    {matsUnicos.map((mat) => (
                      <div
                        key={mat}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: BG_SURFACE,
                          border: `1px solid ${getMatPreco(mat) > 0 ? "rgba(196,160,80,0.25)" : "rgba(255,255,255,0.05)"}`,
                          borderRadius: 7,
                          padding: "7px 10px",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            fontSize: 11,
                            color: getMatPreco(mat) > 0 ? TEXT_PRIM : TEXT_DIM,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={mat}
                        >
                          {mat}
                        </div>
                        <NumInput
                          value={getMatPreco(mat)}
                          onChange={(v) => setMatPreco(mat, v)}
                          min={0}
                          style={{
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(196,160,80,0.2)",
                            borderRadius: 4,
                            color: gold,
                            padding: "4px 8px",
                            fontSize: 11,
                            width: 80,
                            fontFamily: "'Space Mono',monospace",
                            outline: "none",
                            textAlign: "right",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* FILTRO DE SUBCATEGORIA */}
                {subcats.length > 1 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    <button
                      onClick={() => setCraftSubcat("all")}
                      style={{
                        background: !craftSubcat || craftSubcat === "all" ? "rgba(196,160,80,0.2)" : "rgba(0,0,0,0.3)",
                        border: `1px solid ${!craftSubcat || craftSubcat === "all" ? "rgba(196,160,80,0.4)" : "rgba(255,255,255,0.07)"}`,
                        borderRadius: 6,
                        color: !craftSubcat || craftSubcat === "all" ? gold : TEXT_DIM,
                        padding: "4px 10px",
                        cursor: "pointer",
                        fontFamily: "'Space Mono',monospace",
                        fontSize: 10,
                      }}
                    >
                      {lang === "en" ? "All" : "Todos"}
                    </button>
                    {subcats.map((sc) => (
                      <button
                        key={sc}
                        onClick={() => setCraftSubcat(sc)}
                        style={{
                          background: craftSubcat === sc ? "rgba(96,165,250,0.15)" : "rgba(0,0,0,0.3)",
                          border: `1px solid ${craftSubcat === sc ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: 6,
                          color: craftSubcat === sc ? blue : TEXT_DIM,
                          padding: "4px 10px",
                          cursor: "pointer",
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 10,
                        }}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                )}

                {/* TABELA DE RECEITAS */}
                <div style={{ marginBottom: 12 }}>
                  <TaxToggle
                    label={lang === "en" ? "Market tax 4% (sell price)" : "Taxa mercado 4% (preço de venda)"}
                    detail={
                      lang === "en"
                        ? "Applied to Revenue column — reduces margin"
                        : "Aplicada na coluna Receita — reduz a margem"
                    }
                    active={taxMktCrafting}
                    onChange={setTaxMktCrafting}
                  />
                </div>
                <Divider label={TR[lang].osRecipes} />
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr>
                        {[
                          "Nv",
                          "Item",
                          "Qtd",
                          lang === "en" ? "Mat. Cost" : "Custo Mat.",
                          `Tax S/Q (+${extraTaxPct}%)`,
                          lang === "en" ? "Total Cost" : "Custo Total",
                          lang === "en" ? "Sell Price (un)" : "Preço Venda (un)",
                          lang === "en" ? "Revenue" : "Receita",
                          lang === "en" ? "Margin" : "Margem",
                          lang === "en" ? "Margin %" : "Margem %",
                          "Silver/EXP",
                          "Crafts → OS",
                          lang === "en" ? "Cost to OS" : "Custo até OS",
                          lang === "en" ? "Profit to OS" : "Profit até OS",
                          "Crafts → MAX",
                          lang === "en" ? "Cost to MAX" : "Custo até MAX",
                          lang === "en" ? "Profit to MAX" : "Profit até MAX",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              color: gold,
                              padding: "8px 8px",
                              textAlign: "center",
                              fontSize: 9,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              borderBottom: "1px solid rgba(196,160,80,0.2)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calc.map((item) => {
                        const isBest = topMargem[0]?.nome === item.nome;
                        return (
                          <tr key={item.nome} style={{ background: isBest ? "rgba(74,222,128,0.05)" : "transparent" }}>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "center",
                                color: TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              {item.nivel}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                color: isBest ? green : TEXT_PRIM,
                                fontWeight: isBest ? "bold" : "normal",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              {item.nome}
                              <div style={{ marginTop: 4 }}>
                                {item.materiais.map((m) => {
                                  const hasRecipe = !!findRecipe(m.nome);
                                  const scOn = isSubcraft(item.nome, m.nome);
                                  const sc = item.subcraftInfo?.[m.nome];
                                  return (
                                    <div
                                      key={m.nome}
                                      style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}
                                    >
                                      {hasRecipe && !m.isGemstone ? (
                                        <button
                                          onClick={() => toggleSC(item.nome, m.nome)}
                                          title={
                                            scOn
                                              ? lang === "en"
                                                ? "Switch to market price"
                                                : "Usar preço de mercado"
                                              : lang === "en"
                                                ? "Craft this material"
                                                : "Craftar este material"
                                          }
                                          style={{
                                            background: scOn ? "rgba(196,160,80,0.2)" : "rgba(255,255,255,0.05)",
                                            border: `1px solid ${scOn ? "rgba(196,160,80,0.5)" : "rgba(255,255,255,0.1)"}`,
                                            borderRadius: 3,
                                            color: scOn ? gold : TEXT_DIM,
                                            padding: "1px 5px",
                                            cursor: "pointer",
                                            fontSize: 9,
                                            fontFamily: "'Space Mono',monospace",
                                            flexShrink: 0,
                                            lineHeight: 1.4,
                                          }}
                                        >
                                          {scOn ? "⚒️" : "🛒"}
                                        </button>
                                      ) : (
                                        <span style={{ width: 22, display: "inline-block" }} />
                                      )}
                                      <span style={{ fontSize: 9, color: scOn ? gold : TEXT_DIM }}>
                                        {m.qtd}× {m.nome}
                                        {scOn && sc && (
                                          <span style={{ color: "rgba(96,165,250,0.6)", marginLeft: 4 }}>
                                            ({sc.craftsNeeded} craft{sc.craftsNeeded > 1 ? "s" : ""} · +{sc.exp} EXP)
                                          </span>
                                        )}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                              {item.expSubcrafts > 0 && (
                                <div style={{ fontSize: 9, color: blue, marginTop: 4 }}>
                                  EXP total: {fmtInt(item.expTotal)} ({fmtInt(item.exp)} + {fmtInt(item.expSubcrafts)}{" "}
                                  sub)
                                </div>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "center",
                                color: TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              {item.qty}x
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.custoMateriais > 0 ? TEXT_PRIM : TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.custoMateriais > 0 ? fmtInt(item.custoMateriais) : "—"}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: extraTaxPct > 0 ? red : TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <div
                                style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}
                              >
                                {/* Toggle Silver/QUEST */}
                                <button
                                  onClick={() => toggleTQ(item.nome)}
                                  title={
                                    item.taxQUESTAtivo
                                      ? lang === "en"
                                        ? "Pay tax in Silver"
                                        : "Pagar tax em Silver"
                                      : lang === "en"
                                        ? "Pay tax in QUEST (-20%)"
                                        : "Pagar tax em QUEST (-20%)"
                                  }
                                  style={{
                                    background: item.taxQUESTAtivo ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
                                    border: `1px solid ${item.taxQUESTAtivo ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)"}`,
                                    borderRadius: 3,
                                    color: item.taxQUESTAtivo ? purple : TEXT_DIM,
                                    padding: "1px 5px",
                                    cursor: "pointer",
                                    fontSize: 9,
                                    fontFamily: "'Space Mono',monospace",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {item.taxQUESTAtivo ? "Q" : "S"}
                                </button>
                                <div style={{ textAlign: "right" }}>
                                  {item.taxQUESTAtivo ? (
                                    <>
                                      <div style={{ color: purple, fontSize: 11 }}>
                                        {item.taxQUEST_valor.toFixed(4)} Q
                                      </div>
                                      <div style={{ color: green, fontSize: 9 }}>
                                        -{taxQUESTDesconto}% {lang === "en" ? "disc." : "desc."}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {fmtInt(item.taxReal)}
                                      <span style={{ fontSize: 9, color: TEXT_DIM }}>
                                        {" "}
                                        (+{fmtInt(item.taxReal - item.baseTax)})
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.custoMateriais > 0 ? orange : TEXT_DIM,
                                fontWeight: "bold",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.custoMateriais > 0 ? (
                                item.taxQUESTAtivo ? (
                                  <div>
                                    <div style={{ color: orange }}>{fmtInt(item.custoMateriais)} silver</div>
                                    <div style={{ color: purple, fontSize: 10, fontWeight: "normal" }}>
                                      + {item.taxQUEST_valor.toFixed(6)} Q
                                    </div>
                                  </div>
                                ) : (
                                  fmtInt(item.custoTotal)
                                )
                              ) : (
                                "—"
                              )}
                            </td>
                            <td
                              style={{
                                padding: "6px 8px",
                                textAlign: "center",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              <NumInput
                                value={item.precoVenda}
                                onChange={(v) => setCraftPrice(item.nome, v)}
                                min={0}
                                style={{
                                  background: "rgba(0,0,0,0.4)",
                                  border: "1px solid rgba(196,160,80,0.3)",
                                  borderRadius: 4,
                                  color: gold,
                                  padding: "4px 8px",
                                  fontSize: 11,
                                  width: 90,
                                  fontFamily: "'Space Mono',monospace",
                                  outline: "none",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.temDados ? TEXT_PRIM : TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.temDados ? fmtInt(item.receitaTotal) : "—"}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.margem !== null ? pc(item.margem) : TEXT_DIM,
                                fontWeight: "bold",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.margem !== null ? `${item.margem >= 0 ? "+" : ""}${fmtInt(item.margem)}` : "—"}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.margemPct !== null ? pc(item.margemPct) : TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.margemPct !== null
                                ? `${item.margemPct >= 0 ? "+" : ""}${fmt(item.margemPct, 1)}%`
                                : "—"}
                            </td>
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                color: item.margemEXP !== null ? (item.margemEXP > 0 ? purple : red) : TEXT_DIM,
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.margemEXP !== null ? fmt(item.margemEXP, 2) : "—"}
                            </td>

                            {/* Crafts → Oversupply (100%) */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              {craftOversupply >= 100 ? (
                                <span style={{ color: red, fontSize: 10 }}>
                                  {lang === "en" ? "already in OS" : TR[lang].osAlready}
                                </span>
                              ) : item.craftsParaOS !== null ? (
                                <div>
                                  <span style={{ color: orange, fontWeight: "bold" }}>{fmtInt(item.craftsParaOS)}</span>
                                  {/* Sub-crafts */}
                                  {Object.entries(item.subcraftInfo || {}).map(([matNome, sc]) => (
                                    <div
                                      key={matNome}
                                      style={{ fontSize: 9, color: "rgba(96,165,250,0.55)", marginTop: 2 }}
                                    >
                                      ↳ {fmtInt(item.craftsParaOS * sc.craftsNeeded)} {matNome}
                                    </div>
                                  ))}
                                  {/* Materiais base */}
                                  {item.materiais
                                    .filter((m) => !m.isGemstone && !item.subcraftInfo?.[m.nome])
                                    .map((m) => (
                                      <div
                                        key={m.nome}
                                        style={{ fontSize: 9, color: "rgba(143,160,184,0.35)", marginTop: 1 }}
                                      >
                                        ↳ {fmtInt(item.craftsParaOS * m.qtd)} {m.nome}
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>

                            {/* Profit total até OS */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {craftOversupply >= 100 ? (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              ) : item.custoAteOS !== null ? (
                                <div>
                                  <div style={{ color: red, fontWeight: "bold" }}>{fmtInt(item.custoAteOS)}</div>
                                  {Object.entries(item.subcraftInfo || {}).map(([matNome, sc]) => (
                                    <div
                                      key={matNome}
                                      style={{ fontSize: 9, color: "rgba(248,113,113,0.5)", marginTop: 2 }}
                                    >
                                      ↳ {fmtInt(item.craftsParaOS * sc.custo)} {matNome}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>

                            {/* Profit total até OS */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {craftOversupply >= 100 ? (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              ) : item.profitAteOS !== null ? (
                                <div>
                                  <span style={{ color: pc(item.profitAteOS), fontWeight: "bold" }}>
                                    {item.profitAteOS >= 0 ? "+" : ""}
                                    {fmtInt(item.profitAteOS)}
                                  </span>
                                  {item.expSubcrafts > 0 && item.craftsParaOS !== null && (
                                    <div style={{ fontSize: 9, color: blue, marginTop: 2 }}>
                                      +{fmtInt(item.craftsParaOS * item.expSubcrafts)} EXP sub
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>

                            {/* Crafts → MAX (500%) */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                              }}
                            >
                              {craftOversupply >= 500 ? (
                                <span style={{ color: red, fontSize: 10 }}>MAX</span>
                              ) : item.craftsParaMax !== null ? (
                                <div>
                                  <span style={{ color: TEXT_DIM }}>{fmtInt(item.craftsParaMax)}</span>
                                  {/* Sub-crafts */}
                                  {Object.entries(item.subcraftInfo || {}).map(([matNome, sc]) => (
                                    <div
                                      key={matNome}
                                      style={{ fontSize: 9, color: "rgba(96,165,250,0.35)", marginTop: 2 }}
                                    >
                                      ↳ {fmtInt(item.craftsParaMax * sc.craftsNeeded)} {matNome}
                                    </div>
                                  ))}
                                  {/* Materiais base */}
                                  {item.materiais
                                    .filter((m) => !m.isGemstone && !item.subcraftInfo?.[m.nome])
                                    .map((m) => (
                                      <div
                                        key={m.nome}
                                        style={{ fontSize: 9, color: "rgba(143,160,184,0.2)", marginTop: 1 }}
                                      >
                                        ↳ {fmtInt(item.craftsParaMax * m.qtd)} {m.nome}
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>

                            {/* Profit total até MAX */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {craftOversupply >= 500 ? (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              ) : item.custoAteMax !== null ? (
                                <div>
                                  <div style={{ color: red }}>{fmtInt(item.custoAteMax)}</div>
                                  {Object.entries(item.subcraftInfo || {}).map(([matNome, sc]) => (
                                    <div
                                      key={matNome}
                                      style={{ fontSize: 9, color: "rgba(248,113,113,0.35)", marginTop: 2 }}
                                    >
                                      ↳ {fmtInt(item.craftsParaMax * sc.custo)} {matNome}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>

                            {/* Profit total até MAX */}
                            <td
                              style={{
                                padding: "7px 8px",
                                textAlign: "right",
                                borderBottom: "1px solid rgba(255,255,255,0.03)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {craftOversupply >= 500 ? (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              ) : item.profitAteMax !== null ? (
                                <div>
                                  <span style={{ color: pc(item.profitAteMax) }}>
                                    {item.profitAteMax >= 0 ? "+" : ""}
                                    {fmtInt(item.profitAteMax)}
                                  </span>
                                  {item.expSubcrafts > 0 && item.craftsParaMax !== null && (
                                    <div style={{ fontSize: 9, color: "rgba(96,165,250,0.35)", marginTop: 2 }}>
                                      +{fmtInt(item.craftsParaMax * item.expSubcrafts)} EXP sub
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: TEXT_DIM }}>—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 12, lineHeight: 1.7 }}>
                  💡{" "}
                  {lang === "en" ? (
                    <>
                      <strong style={{ color: TEXT_PRIM }}>Mat. Cost</strong> = sum of (qty × price) per material ·{" "}
                      <strong style={{ color: TEXT_PRIM }}>Tax</strong> = base tax adjusted by current oversupply ·{" "}
                      <strong style={{ color: TEXT_PRIM }}>Crafts → OS</strong> = crafts needed to reach 100% oversupply
                      · Rankings only appear when sell price and materials are filled.
                    </>
                  ) : (
                    <>
                      <strong style={{ color: TEXT_PRIM }}>Custo Mat.</strong> = soma de (qtd × preço) de cada material
                      · <strong style={{ color: TEXT_PRIM }}>Tax</strong> = tax base ajustada pelo oversupply atual ·{" "}
                      <strong style={{ color: TEXT_PRIM }}>Crafts → OS</strong> = quantos crafts até atingir 100% de
                      oversupply · Rankings só aparecem quando preço de venda e materiais estão preenchidos.
                    </>
                  )}
                </div>
              </Section>
            </div>
          );
        })()}

      {tab === "calibracao" && (
        <div>
          <FormulaPanel
            lang={lang}
            title={lang === "en" ? "Calibration" : "Calibração"}
            descricao={
              lang === "en"
                ? "The Pool Rate is the conversion between your Merchant Influence (IM) and the QUEST received on Friday. Calibrate weekly by entering your real Friday chest value. The QUEST forecast uses this rate to predict next week."
                : "O Pool Rate é a conversão entre sua Influência Mercante (IM) e o QUEST recebido na sexta. Calibre toda semana inserindo o valor real do chest de sexta. A previsão de QUEST usa essa taxa para projetar a próxima semana."
            }
            formulas={[
              {
                label: lang === "en" ? "Pool Rate calibration" : "Calibração do Pool Rate",
                formula: "poolRate = QUEST recebido ÷ (imExpSemana + imTotalPacks)",
              },
              {
                label: lang === "en" ? "Total IM" : "IM Total",
                formula:
                  "imTotal = imExpedição + (packsNormais × imBase) + (enhanced × imBase × 2) + (plunder × imBase × 0.15)",
              },
              {
                label: lang === "en" ? "QUEST forecast" : "Previsão de QUEST",
                formula:
                  "QUESTprevisto = imTotal × poolRate\nQUESTlíquido = QUESTprevisto × (1 − exchFee) → applySaque",
              },
              { label: "USD", formula: "USD = QUESTlíquido × questUSD" },
            ]}
          />
          <Section title={TR[lang].calTitle} icon="📐" borderColor="rgba(74,222,128,0.4)">
            <div
              style={{
                background: "rgba(74,222,80,0.04)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 11,
                color: dim,
                lineHeight: 1.7,
              }}
            >
              {lang === "en"
                ? "Enter the QUEST received from the Friday chest. Total IM is calculated automatically (Expedition + Packs with Enhanced and Plunder)."
                : "Insira o QUEST recebido no chest de sexta. A IM total é calculada automaticamente (Expedição + Packs com Enhanced e Plunder)."}
            </div>

            <div
              style={{
                background: "rgba(196,160,80,0.06)",
                border: "1px solid rgba(196,160,80,0.3)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 11,
                color: gold,
                lineHeight: 1.7,
              }}
            >
              {lang === "en"
                ? '⚠️ Formula-based, not officially confirmed: Silver = (35,000 + Distance × 8.5) × 4.4 × (LocalDemand% ÷ 100) × (1 + Modifiers%) ≈ (154,000 + Distance × 37.4) × (LocalDemand% ÷ 100) × (1 + Modifiers%). The base formula (35,000 + Distance × 8.5) is the exact one Tavernlight officially published for patch 1.0.8 (TL post, 05/21/2025). The ×4.4 factor (+340%) reflects the official 1.0.9.5 changelog (06/16/2026), which only disclosed the aggregate percentage increase, not new exact coefficients — so this ×4.4 applied on top of the old formula is our extrapolation. Local Demand is per pack + destination, read directly from the in-game Tradepack menu (T → pack → caret icon) and saved per destination for reuse; 100% is the baseline (no change) — unfilled destinations default to 100% until you confirm the real value. Modifiers are fixed checkboxes applied to the pack\u2019s final sale value and stack additively: Bartering I +5%, Bartering II +10%, Plundering +10%, Stolen −20%. Applies only to packs crafted after 06/16/2026. Adjust the Distance field to your real route and recalibrate as soon as you have post-patch in-game data.'
                : "⚠️ Baseado em fórmula, não confirmado oficialmente: Silver = (35.000 + Distância × 8,5) × 4,4 × (DemandaLocal% ÷ 100) × (1 + Modificadores%) ≈ (154.000 + Distância × 37,4) × (DemandaLocal% ÷ 100) × (1 + Modificadores%). A fórmula base (35.000 + Distância × 8,5) é a exata divulgada oficialmente pela Tavernlight no patch 1.0.8 (post da TL, 21/05/2025). O fator ×4,4 (+340%) reflete o changelog oficial do 1.0.9.5 (16/06/2026), que só divulgou o percentual agregado, não os novos coeficientes exatos — então esse ×4,4 aplicado sobre a fórmula antiga é uma extrapolação nossa. A Demanda Local é por pack + destino, lida direto do menu de tradepack in-game (T → pack → ícone de seta) e salva por destino pra reaproveitar; 100% é o padrão (sem alteração) — destinos não preenchidos assumem 100% até você confirmar o valor real. Os Modificadores são checkboxes fixos aplicados sobre a venda final do pack e somam entre si: Bartering I +5%, Bartering II +10%, Plundering +10%, Stolen −20%. Vale só para packs craftados após 16/06/2026. Ajuste o campo Distância para sua rota real e recalibre assim que tiver dado real do jogo pós-patch."}
            </div>

            <div style={{ marginBottom: 14 }}>
              <Field
                label={TR[lang].calQUEST}
                value={calQUEST}
                onChange={setCalQUEST}
                step={1}
                suffix="QUEST"
                hint={TR[lang].calQUESTHint}
              />
            </div>

            {/* IM Total automática */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  background: "rgba(96,165,250,0.05)",
                  border: "1px solid rgba(96,165,250,0.2)",
                  borderRadius: 8,
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>
                  IM Expedição/sem
                </div>
                <div style={{ color: blue, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(imExpSemana)}
                </div>
                <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 3 }}>da aba Tradepack</div>
              </div>
              <div
                style={{
                  background: "rgba(196,160,80,0.05)",
                  border: "1px solid rgba(196,160,80,0.2)",
                  borderRadius: 8,
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>
                  IM Packs/sem
                </div>
                <div style={{ color: gold, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(r.imTotal_semana)}
                </div>
                <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 3 }}>
                  incl. Enhanced + Plunder
                </div>
              </div>
              <div
                style={{
                  background: "rgba(74,222,128,0.06)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  borderRadius: 8,
                  padding: "12px 14px",
                }}
              >
                <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>
                  IM Total (automático)
                </div>
                <div style={{ color: green, fontSize: 16, fontWeight: "bold", fontFamily: "'Space Mono', monospace" }}>
                  {fmtInt(imExpSemana + r.imTotal_semana)}
                </div>
                <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10, marginTop: 3 }}>Exp + Packs</div>
              </div>
            </div>

            {/* Pool Rate calculado */}
            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: 8,
                padding: "14px 16px",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div
                    style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}
                  >{`${TR[lang].poolRate} ${lang === "en" ? "calculated" : "calculado"}`}</div>
                  <div style={{ color: "rgba(143,160,184,0.55)", fontSize: 10 }}>
                    {calQUEST} QUEST ÷ {fmtInt(imExpSemana + r.imTotal_semana)} IM
                  </div>
                </div>
                <div style={{ color: green, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>
                  {(calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(8)}
                </div>
              </div>
            </div>

            <button
              onClick={() => setPoolRate(parseFloat((calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(9)))}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.08))",
                border: "1px solid rgba(74,222,128,0.4)",
                borderRadius: 8,
                color: green,
                padding: "11px",
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
              }}
            >
              ${lang === "en" ? "✅ Apply Pool Rate:" : "✅ Aplicar Pool Rate:"}{" "}
              {(calQUEST / (imExpSemana + r.imTotal_semana)).toFixed(8)}
            </button>
          </Section>

          <Section
            title={lang === "en" ? "QUEST Forecast — Next Friday" : "Previsão de QUEST — Próxima Sexta"}
            icon="🔮"
            borderColor="rgba(167,139,250,0.4)"
          >
            <div
              style={{
                background: "rgba(167,139,250,0.05)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 11,
                color: dim,
                lineHeight: 1.7,
              }}
            >
              {lang === "en"
                ? "Based on your current Pool Rate and IM configuration, this is the estimated QUEST you will receive next Friday."
                : "Com base no Pool Rate atual e na sua configuração de IM, esta é a estimativa de QUEST que você vai receber na próxima sexta."}
            </div>

            {(() => {
              const imTotal = imExpSemana + r.imTotal_semana;
              const questPrevisto = imTotal * poolRate;
              const questComExch = applySaque(applyExchQ(questPrevisto, taxExchTradepack));
              const usdPrevisto = questComExch * questUSD;
              const silverPrevisto = questPrevisto * questToSilver;

              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div
                      style={{
                        background: "rgba(167,139,250,0.07)",
                        border: "1px solid rgba(167,139,250,0.25)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 8,
                        }}
                      >
                        IM Total/sem
                      </div>
                      <div
                        style={{
                          color: purple,
                          fontSize: 18,
                          fontFamily: "'Space Mono',monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {fmtInt(imTotal)}
                      </div>
                      <div style={{ color: "rgba(143,160,184,0.45)", fontSize: 9, marginTop: 4 }}>
                        {lang === "en" ? "Exp + Packs" : "Exp + Packs"}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(167,139,250,0.07)",
                        border: "1px solid rgba(167,139,250,0.25)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 8,
                        }}
                      >
                        Pool Rate
                      </div>
                      <div
                        style={{
                          color: purple,
                          fontSize: 14,
                          fontFamily: "'Space Mono',monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {poolRate.toFixed(8)}
                      </div>
                      <div style={{ color: "rgba(143,160,184,0.45)", fontSize: 9, marginTop: 4 }}>
                        {lang === "en" ? "from calibration" : "da calibração"}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(167,139,250,0.12)",
                        border: "1px solid rgba(167,139,250,0.45)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 8,
                        }}
                      >
                        {lang === "en" ? "Estimated QUEST" : "QUEST Estimado"}
                      </div>
                      <div
                        style={{
                          color: purple,
                          fontSize: 22,
                          fontFamily: "'Space Mono',monospace",
                          fontWeight: "bold",
                        }}
                      >
                        {fmt(questPrevisto, 2)}
                      </div>
                      <div style={{ color: "rgba(143,160,184,0.45)", fontSize: 9, marginTop: 4 }}>
                        {lang === "en" ? "before fees" : "antes das taxas"}
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(74,222,128,0.07)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: dim,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 8,
                        }}
                      >
                        {lang === "en" ? "Net QUEST (after fees)" : "QUEST Líquido (após taxas)"}
                      </div>
                      <div
                        style={{ color: green, fontSize: 22, fontFamily: "'Space Mono',monospace", fontWeight: "bold" }}
                      >
                        {fmt(questComExch, 2)}
                      </div>
                      <div style={{ color: "rgba(143,160,184,0.45)", fontSize: 9, marginTop: 4 }}>
                        ≈ {fmtUSD(usdPrevisto)} USD
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: dim,
                        fontSize: 9,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: 10,
                      }}
                    >
                      {lang === "en" ? "Breakdown" : "Detalhamento"}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11 }}>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "Expedition IM:" : "IM Expedição:"}{" "}
                        <span style={{ color: blue }}>{fmtInt(imExpSemana)}</span>
                      </div>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "Packs IM:" : "IM Packs:"}{" "}
                        <span style={{ color: gold }}>{fmtInt(r.imTotal_semana)}</span>
                      </div>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "Gross QUEST:" : "QUEST bruto:"}{" "}
                        <span style={{ color: purple }}>{fmt(questPrevisto, 4)}</span>
                      </div>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "Silver equivalent:" : "Equiv. silver:"}{" "}
                        <span style={{ color: gold }}>{fmtInt(silverPrevisto)}</span>
                      </div>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "After exchange (4%):" : "Após exchange (4%):"}{" "}
                        <span style={{ color: questComExch < questPrevisto ? red : green }}>
                          {fmt(applyExchQ(questPrevisto, taxExchTradepack), 4)}
                        </span>
                      </div>
                      <div style={{ color: dim }}>
                        {lang === "en" ? "After withdraw (20%):" : "Após saque (20%):"}{" "}
                        <span style={{ color: green }}>{fmt(questComExch, 4)}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 10, color: "rgba(143,160,184,0.4)", lineHeight: 1.7 }}>
                      {lang === "en"
                        ? "⚠️ This is a forecast based on your current settings. Actual QUEST may vary with pool rate fluctuations."
                        : "⚠️ Esta é uma previsão com base nas suas configurações atuais. O QUEST real pode variar com flutuações do pool rate."}
                    </div>
                  </div>
                </div>
              );
            })()}
          </Section>

          <Section title={TR[lang].lastCalib} icon="📅">
            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                borderRadius: 8,
                padding: 14,
                fontSize: 11,
                color: dim,
                lineHeight: 1.8,
              }}
            >
              <div style={{ color: gold, marginBottom: 8, fontFamily: "'Cinzel', serif", fontSize: 12 }}>
                Dados ativos no modelo
              </div>
              <div>
                IM Expedição/sem: <span style={{ color: blue }}>{fmtInt(imExpSemana)}</span>
              </div>
              <div>
                IM Packs/sem: <span style={{ color: gold }}>{fmtInt(r.imTotal_semana)}</span>
              </div>
              <div>
                IM Total: <span style={{ color: green }}>{fmtInt(imExpSemana + r.imTotal_semana)}</span>
              </div>
              <div>
                QUEST recebido: <span style={{ color: green }}>{fmtInt(calQUEST)}</span>
              </div>
              <div>
                ${lang === "en" ? "Active Pool Rate:" : "Pool Rate ativo:"}{" "}
                <span style={{ color: green }}>{poolRate.toFixed(8)}</span>
              </div>
              <div>
                IM/Pack: <span style={{ color: green }}>silver × 10 (automático)</span>
              </div>
              <div style={{ marginTop: 8, color: "rgba(143,160,184,0.45)" }}>
                lang==="en"?"Update every Friday after payment — enter the QUEST received and click Apply.":"Atualize
                toda sexta após o pagamento — insira o QUEST recebido e clique em Aplicar."
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* TAB: INFUSION */}
      {tab === "infusion" && (
        <div>
          <FormulaPanel
            title={lang === "en" ? "Infusion — How it's calculated" : "Infusion — Como é calculado"}
            descricao={
              lang === "en"
                ? "Calculates infusion cost and EXP per hour, and shows which infusion gives the best silver/hour for hunting. Also supports infusion flipping (buy cheap, sell expensive)."
                : "Calcula custo e EXP de infusão por hora, e mostra qual infusão dá mais silver/hora para caçar. Também suporta flip de infusão (compra barata, vende mais cara)."
            }
            formulas={[
              {
                label: lang === "en" ? "Cost per hour" : "Custo por hora",
                formula: "custoHora = qtdHora × preçoCompra",
              },
              {
                label: lang === "en" ? "EXP per hour" : "EXP por hora",
                formula: "expHora   = qtdHora × expPorInfusion\nhorasParaTarget = targetEXP ÷ expHora",
              },
              {
                label: lang === "en" ? "Silver/hour hunting" : "Silver/hora caçando",
                formula: "silverHora = qtdHora × preçoVenda\n(infusion vendida no mercado após coleta)",
              },
              {
                label: lang === "en" ? "Best for hunting" : "Melhor para caçar",
                formula: "Ranking = ordenado por silverHora DESC\ncustoMensal = custoHora × horasDia × 30",
              },
              {
                label: lang === "en" ? "Flip profit" : "Lucro no flip",
                formula: "lucroFlip = (preçoVenda × 0.96) - preçoCompra\n  [0.96 = desconto da taxa de mercado 4%]",
              },
            ]}
          />
          <FormulaPanel
            lang={lang}
            title="Infusion"
            descricao={
              lang === "en"
                ? "Ranks infusions by silver/EXP efficiency — the cheapest EXP comes from the infusion with the lowest silver-per-EXP ratio. Also calculates monthly hunt silver based on infusion usage per hour."
                : "Ranqueia infusões por eficiência silver/EXP — o EXP mais barato vem da infusão com menor razão silver/EXP. Também calcula o silver mensal de hunt baseado no uso de infusão por hora."
            }
            formulas={[
              {
                label: lang === "en" ? "Silver/EXP per infusion" : "Silver/EXP por infusion",
                formula: "silverEXP = preçoMercado ÷ expPorUso",
              },
              {
                label: lang === "en" ? "Total cost to target EXP" : "Custo total até EXP alvo",
                formula: "qtdNecessária = ⌈expAlvo ÷ expPorUso⌉\ncustoTotal = qtdNecessária × preçoMercado",
              },
              {
                label: lang === "en" ? "Hunt silver/hour (best infusion)" : "Silver/hora hunt (melhor infusion)",
                formula: "silverHora = qtdInfusion/hora × preçoInfusion + silverNPC",
              },
              {
                label: lang === "en" ? "Monthly projection" : "Projeção mensal",
                formula: "silverMes = silverHora × horasDia × 30",
              },
            ]}
          />
          {/* Target EXP */}
          <Section title={`✨ ${lang === "en" ? "Infusion Calculator" : "Calculadora de Infusion"}`} icon="⚗️" accent>
            <div
              style={{
                background: "rgba(167,139,250,0.05)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 11,
                color: dim,
                lineHeight: 1.7,
              }}
            >
              {lang === "en" ? (
                <>
                  💡 Enter the <strong style={{ color: purple }}>market price</strong> of each Infusion and the{" "}
                  <strong style={{ color: gold }}>EXP you need to gain</strong>. The calculator shows which to buy and
                  how much it will cost.
                </>
              ) : (
                <>
                  💡 Insira o <strong style={{ color: purple }}>preço de mercado</strong> de cada Infusion e o{" "}
                  <strong style={{ color: gold }}>EXP que você precisa ganhar</strong>. A calculadora mostra qual
                  comprar e quanto vai custar.
                </>
              )}
            </div>

            {/* Target EXP */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <label
                style={{
                  color: dim,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                EXP necessário:
              </label>
              <NumInput
                value={infusionTargetEXP}
                onChange={(v) => setInfusionTargetEXP(v)}
                min={0}
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${gold}55`,
                  borderRadius: 6,
                  color: gold,
                  padding: "8px 14px",
                  fontSize: 16,
                  width: 160,
                  fontFamily: "'Space Mono', monospace",
                  outline: "none",
                  fontWeight: "bold",
                }}
              />
              <span style={{ color: "rgba(143,160,184,0.45)", fontSize: 10 }}>EXP para infundir no item</span>
            </div>

            {/* Melhor opção destaque */}
            {melhorInfusion && (
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02))",
                  border: "1px solid rgba(74,222,128,0.35)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginBottom: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: green,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    ✅ Melhor custo-benefício atual
                  </div>
                  <div style={{ color: "#f0e6c8", fontSize: 18, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                    {melhorInfusion.nome}
                  </div>
                  <div style={{ color: dim, fontSize: 11, marginTop: 4 }}>
                    {melhorInfusion.exp} EXP/un · {fmtInt(melhorInfusion.preco)} silver/un
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: dim, fontSize: 10, textTransform: "uppercase", marginBottom: 4 }}>
                    Para {fmtInt(infusionTargetEXP)} EXP
                  </div>
                  <div
                    style={{ color: green, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}
                  >
                    {fmtInt(melhorInfusion.custoTotal)}
                  </div>
                  <div style={{ color: dim, fontSize: 10 }}>{fmtInt(melhorInfusion.qtdNecessaria)} unidades</div>
                </div>
              </div>
            )}

            {/* Tabela Terra */}
            <Divider label="⚔️ Infusions de Terra" />
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 20 }}>
              <thead>
                <tr>
                  {[
                    "#",
                    "Infusion",
                    "EXP/un",
                    TR[lang].matsMkt,
                    "Silver/EXP",
                    `Qtd p/ ${fmtInt(infusionTargetEXP)} EXP`,
                    lang === "en" ? "Total Cost" : "Custo Total",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: gold,
                        padding: "8px 10px",
                        textAlign: "center",
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(196,160,80,0.2)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {infusionRanking
                  .filter((i) => i.tipo === "terra")
                  .map((inf, rankIdx) => {
                    const rank = infusionRanking.findIndex((r) => r.nome === inf.nome);
                    const isBest = rank === 0 && inf.preco > 0;
                    const rowColor = isBest ? "rgba(74,222,128,0.06)" : "transparent";
                    return (
                      <tr key={inf.nome} style={{ background: rowColor }}>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : "rgba(143,160,184,0.45)",
                            fontSize: 11,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? `#${rank + 1}` : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: isBest ? green : "#c0c0d0",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.nome}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: purple,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.exp}
                        </td>
                        <td
                          style={{
                            padding: "6px 10px",
                            textAlign: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          <NumInput
                            value={inf.preco}
                            onChange={(v) => setInfusionPreco(inf.nome, v)}
                            min={0}
                            style={{
                              background: "rgba(0,0,0,0.4)",
                              border: "1px solid rgba(251,146,60,0.35)",
                              borderRadius: 4,
                              color: orange,
                              padding: "4px 8px",
                              fontSize: 12,
                              width: "100%",
                              fontFamily: "'Space Mono', monospace",
                              outline: "none",
                              textAlign: "center",
                            }}
                          />
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : inf.preco > 0 ? "#f0e6c8" : "rgba(143,160,184,0.45)",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? fmt(inf.silverPerExp, 1) : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: inf.preco > 0 ? "#f0e6c8" : "rgba(143,160,184,0.45)",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? fmtInt(inf.qtdNecessaria) : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : inf.preco > 0 ? orange : "rgba(143,160,184,0.45)",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
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
                  {[
                    "#",
                    "Infusion",
                    "EXP/un",
                    TR[lang].matsMkt,
                    "Silver/EXP",
                    `Qtd p/ ${fmtInt(infusionTargetEXP)} EXP`,
                    lang === "en" ? "Total Cost" : "Custo Total",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: blue,
                        padding: "8px 10px",
                        textAlign: "center",
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(96,165,250,0.2)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {infusionRanking
                  .filter((i) => i.tipo === "mar")
                  .map((inf) => {
                    const rank = infusionRanking.findIndex((r) => r.nome === inf.nome);
                    const isBest = rank === 0 && inf.preco > 0;
                    return (
                      <tr key={inf.nome} style={{ background: isBest ? "rgba(74,222,128,0.06)" : "transparent" }}>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : "rgba(143,160,184,0.45)",
                            fontSize: 11,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? `#${rank + 1}` : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: isBest ? green : "#c0c0d0",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.nome}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: blue,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.exp}
                        </td>
                        <td
                          style={{
                            padding: "6px 10px",
                            textAlign: "center",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          <NumInput
                            value={inf.preco}
                            onChange={(v) => setInfusionPreco(inf.nome, v)}
                            min={0}
                            style={{
                              background: "rgba(0,0,0,0.4)",
                              border: "1px solid rgba(96,165,250,0.35)",
                              borderRadius: 4,
                              color: blue,
                              padding: "4px 8px",
                              fontSize: 12,
                              width: "100%",
                              fontFamily: "'Space Mono', monospace",
                              outline: "none",
                              textAlign: "center",
                            }}
                          />
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : inf.preco > 0 ? "#f0e6c8" : "rgba(143,160,184,0.45)",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? fmt(inf.silverPerExp, 1) : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: inf.preco > 0 ? "#f0e6c8" : "rgba(143,160,184,0.45)",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? fmtInt(inf.qtdNecessaria) : "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            textAlign: "center",
                            color: isBest ? green : inf.preco > 0 ? blue : "rgba(143,160,184,0.45)",
                            fontWeight: isBest ? "bold" : "normal",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                          }}
                        >
                          {inf.preco > 0 ? fmtInt(inf.custoTotal) : "—"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Section>

          {/* MELHOR PARA CAÇAR */}
          <Section
            title={`🏹 ${lang === "en" ? "Best for Hunting" : TR[lang].infHunt}`}
            icon="⚔️"
            borderColor="rgba(248,113,113,0.3)"
          >
            <div
              style={{
                background: "rgba(248,113,113,0.05)",
                border: "1px solid rgba(248,113,113,0.15)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 11,
                color: dim,
                lineHeight: 1.7,
              }}
            >
              📌{" "}
              {lang === "en" ? (
                <>
                  Enter the <strong style={{ color: red }}>quantity dropped per hour</strong> for each infusion. The
                  ranking shows which generates the most silver/hour while hunting.
                </>
              ) : (
                <>
                  Insira a <strong style={{ color: red }}>quantidade dropada por hora</strong> para cada infusion. O
                  ranking mostra qual gera mais silver/hora ao caçar.
                </>
              )}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
              <thead>
                <tr>
                  {["#", "Infusion", "Tipo", TR[lang].matsMkt, "Qtd / hora", "Silver / hora", "USD / hora"].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: red,
                        padding: "8px 10px",
                        textAlign: "center",
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(248,113,113,0.2)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INFUSIONS.map((inf) => {
                  const qtd = infusionQtdHora[inf.nome] || 0;
                  const preco = infusionPrecos[inf.nome] || 0;
                  const silverH = qtd * preco;
                  const rank = huntDropRanking.findIndex((r) => r.nome === inf.nome);
                  const isBest = rank === 0 && silverH > 0;
                  return (
                    <tr key={inf.nome} style={{ background: isBest ? "rgba(248,113,113,0.06)" : "transparent" }}>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: isBest ? red : "rgba(143,160,184,0.45)",
                          fontSize: 11,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {silverH > 0 ? `#${rank + 1}` : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: isBest ? red : "#c0c0d0",
                          fontWeight: isBest ? "bold" : "normal",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {inf.nome}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: inf.tipo === "mar" ? blue : gold,
                          fontSize: 10,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {inf.tipo === "mar" ? "🌊 Mar" : "⚔️ Terra"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: preco > 0 ? orange : "rgba(143,160,184,0.45)",
                          fontSize: 11,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {preco > 0 ? fmtInt(preco) : "—"}
                      </td>
                      <td
                        style={{
                          padding: "4px 10px",
                          textAlign: "center",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <NumInput
                          value={qtd}
                          onChange={(v) => setInfusionQtd(inf.nome, v)}
                          min={0}
                          style={{
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(248,113,113,0.25)",
                            borderRadius: 4,
                            color: red,
                            padding: "4px 8px",
                            fontSize: 12,
                            width: 80,
                            fontFamily: "'Space Mono', monospace",
                            outline: "none",
                            textAlign: "center",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: isBest ? red : silverH > 0 ? "#f0e6c8" : "rgba(143,160,184,0.45)",
                          fontWeight: isBest ? "bold" : "normal",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {silverH > 0 ? fmtInt(silverH) : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: silverH > 0 ? dim : "rgba(143,160,184,0.45)",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {silverH > 0 ? fmtUSD(toUSD(silverH, taxExchHunt, taxSaqueAtivo)) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {huntDropRanking.length > 0 && (
              <div
                style={{
                  background: "rgba(248,113,113,0.06)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: red,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "en" ? "🏆 Best for hunting" : "🏆 Melhor para caçar"}
                  </div>
                  <div style={{ color: "#f0e6c8", fontSize: 16, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                    {huntDropRanking[0].nome}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: red, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}>
                    {fmtInt(huntDropRanking[0].silverHora)}
                    <span style={{ fontSize: 11 }}> silver/h</span>
                  </div>
                  <div style={{ color: dim, fontSize: 11 }}>
                    {fmtUSD(toUSD(huntDropRanking[0].silverHora * huntHorasDia * 30, taxExchHunt, taxSaqueAtivo))}/
                    {lang === "en" ? "month" : "mês"}{" "}
                    <span style={{ color: red, fontSize: 10, opacity: 0.7 }}>
                      ({huntHorasDia}h/{lang === "en" ? "day" : "dia"})
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Section>

          {/* MELHOR PARA REVENDER */}
          <Section
            title={`💸 ${lang === "en" ? "Best for Flip" : "Melhor para Revender (Flip)"}`}
            icon="📈"
            borderColor="rgba(74,222,128,0.3)"
          >
            <div
              style={{
                background: "rgba(74,222,128,0.05)",
                border: "1px solid rgba(74,222,128,0.15)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 12,
                fontSize: 11,
                color: dim,
                lineHeight: 1.7,
              }}
            >
              📌{" "}
              {lang === "en" ? (
                <>
                  Enter the <strong style={{ color: blue }}>buy price</strong> (cheapest offer on the market) and the{" "}
                  <strong style={{ color: orange }}>sell price</strong> (Market Price field in the table above). The
                  ranking shows which has the highest margin.
                </>
              ) : (
                <>
                  Insira o <strong style={{ color: blue }}>preço de compra</strong> (oferta mais barata no mkt) e o{" "}
                  <strong style={{ color: orange }}>preço de venda</strong> (campo Preço Mkt na tabela acima). O ranking
                  mostra qual tem maior margem.
                </>
              )}
            </div>
            <div style={{ marginBottom: 14 }}>
              <TaxToggle
                label={lang === "en" ? "Market tax 4% on sell (flip)" : "Taxa mercado 4% na venda (flip)"}
                detail={
                  lang === "en"
                    ? "Applied to sell price — reduces flip margin"
                    : "Aplicada ao preço de venda — reduz margem do flip"
                }
                active={taxMktInfusion}
                onChange={setTaxMktInfusion}
              />
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 12 }}>
              <thead>
                <tr>
                  {[
                    "#",
                    "Infusion",
                    "Comprar por",
                    "Vender por",
                    "Lucro / un",
                    lang === "en" ? "Margin %" : "Margem %",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: green,
                        padding: "8px 10px",
                        textAlign: "center",
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid rgba(74,222,128,0.2)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INFUSIONS.map((inf) => {
                  const venda = infusionPrecos[inf.nome] || 0;
                  const compra = infusionCompra[inf.nome] || 0;
                  const lucro = venda > 0 && compra > 0 ? venda * (taxMktInfusion ? 0.96 : 1) - compra : 0;
                  const margem = compra > 0 && lucro > 0 ? (lucro / compra) * 100 : 0;
                  const rank = flipRanking.findIndex((r) => r.nome === inf.nome);
                  const isBest = rank === 0 && lucro > 0;
                  return (
                    <tr key={inf.nome} style={{ background: isBest ? "rgba(74,222,128,0.06)" : "transparent" }}>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: isBest ? green : "rgba(143,160,184,0.45)",
                          fontSize: 11,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {lucro > 0 ? `#${rank + 1}` : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: isBest ? green : "#c0c0d0",
                          fontWeight: isBest ? "bold" : "normal",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {inf.nome}
                      </td>
                      <td
                        style={{
                          padding: "4px 10px",
                          textAlign: "center",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        <NumInput
                          value={compra}
                          onChange={(v) => setInfusionBuy(inf.nome, v)}
                          min={0}
                          style={{
                            background: "rgba(0,0,0,0.4)",
                            border: "1px solid rgba(96,165,250,0.25)",
                            borderRadius: 4,
                            color: blue,
                            padding: "4px 8px",
                            fontSize: 12,
                            width: 100,
                            fontFamily: "'Space Mono', monospace",
                            outline: "none",
                            textAlign: "center",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: venda > 0 ? orange : "rgba(143,160,184,0.45)",
                          fontSize: 11,
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {venda > 0 ? fmtInt(venda) : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: lucro > 0 ? green : lucro < 0 ? red : "rgba(143,160,184,0.45)",
                          fontWeight: isBest ? "bold" : "normal",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {compra > 0 && venda > 0 ? (lucro > 0 ? "+" : "") + fmtInt(lucro) : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: margem > 0 ? green : lucro < 0 ? red : "rgba(143,160,184,0.45)",
                          fontWeight: isBest ? "bold" : "normal",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {margem > 0 ? `+${fmt(margem, 1)}%` : lucro < 0 ? `${fmt((lucro / compra) * 100, 1)}%` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {flipRanking.length > 0 && (
              <div
                style={{
                  background: "rgba(74,222,128,0.06)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: green,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    🏆 Melhor para revender
                  </div>
                  <div style={{ color: "#f0e6c8", fontSize: 16, fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                    {flipRanking[0].nome}
                  </div>
                  <div style={{ color: dim, fontSize: 11, marginTop: 2 }}>
                    compra: {fmtInt(flipRanking[0].compra)} · venda: {fmtInt(flipRanking[0].venda)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{ color: green, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: "bold" }}
                  >
                    +{fmtInt(flipRanking[0].lucroUnit)}
                    <span style={{ fontSize: 11 }}>/un</span>
                  </div>
                  <div style={{ color: green, fontSize: 14 }}>+{fmt(flipRanking[0].margemPct, 1)}% margem</div>
                </div>
              </div>
            )}
          </Section>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(96,165,250,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div
            style={{
              height: 1,
              width: 40,
              background: "linear-gradient(to right, transparent, rgba(96,165,250,0.15))",
            }}
          />
          <span
            style={{ color: "rgba(96,165,250,0.2)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            ToilZero · RavenLab
          </span>
          <div
            style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(96,165,250,0.15))" }}
          />
        </div>
      </div>
    </div>
  );
}
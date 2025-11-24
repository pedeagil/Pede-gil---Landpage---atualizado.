import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Helper to get API key safely
const getApiKey = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not set in environment variables.");
  }
  return apiKey || '';
};

const SYSTEM_INSTRUCTION = `
🤖 IDENTIDADE E ESCOPO DA IA (LEIA COM ATENÇÃO)

Você é a IA Gerente do PedeÁgil, um sistema profissional para gestão de restaurantes.
Sua única função é operar o sistema PedeÁgil e ajudar com tarefas de restaurante.

🚫 REGRAS DE RESTRIÇÃO (O QUE VOCÊ NÃO FAZ)

Assuntos Gerais: Se o usuário perguntar sobre política, esportes, receitas culinárias, piadas, curiosidades ou qualquer coisa que não seja sobre gestão de restaurante ou uso do sistema, responda:

"Desculpe, sou uma IA focada exclusivamente na operação do seu restaurante no PedeÁgil. Posso ajudar com pedidos, financeiro ou iFood?"

Código/Programação: Se o usuário pedir para você escrever código (Python, Java, etc) que não seja relacionado a scripts internos do Base44, recuse educadamente.

Fugas de Personagem: Nunca saia do personagem de "Gerente Operacional".

🛠️ SUAS FERRAMENTAS (OPERACIONAIS)

Você só deve executar ações relacionadas a estas categorias:

1. 🔌 CONEXÃO IFOOD & LOJA

gerarCodigoUserCode(): Inicia conexão.

trocarCodigoPorToken(): Finaliza conexão.

renovarTokens(): Renova acesso.

sincronizarStatusRealV3(): Diagnóstico de status.

alterarStatusLoja(novo_status): Abre/Fecha loja.

2. 📦 GESTÃO DE PEDIDOS

buscarPedidosPolling(): Baixa pedidos.

confirmarPedido(id): Aceita.

despacharPedido(id): Envia.

cancelarPedido(id, codigo, motivo): Cancela.

atualizarLogistica(id, acao): Rastreio.

3. 💰 FINANCEIRO

gerarRelatorioFinanceiro(): Vendas e métricas.

calcularCustoLogistico(): Gastos com entrega.

4. 📝 CARDÁPIO & FISCAL

sincronizarCardapioV3(): Importa produtos.

emitirNFCe(id, cpf): Nota fiscal.

consultarNotaFocus(id): Status nota.

5. 💬 COMUNICAÇÃO

enviarMensagemWhatsApp(): Envio manual.

lerHistoricoChat(): Ver mensagens.

🧠 EXEMPLOS DE INTERAÇÃO

Usuário: "Me conta uma piada."
Você: "Desculpe, meu foco é apenas na operação do seu restaurante. Posso ajudar a verificar seus pedidos ou abrir a loja?"

Usuário: "Qual a receita de massa de pizza?"
Você: "Sou especialista na gestão da sua pizzaria, não na cozinha. Mas posso cadastrar esse produto no cardápio se quiser! Diga 'Importar Cardápio'."

Usuário: "Quanto vendi hoje?"
Você: (Executa gerarRelatorioFinanceiro) "Hoje seu faturamento foi de R$ 1.250,00 com 15 pedidos."

Mantenha-se sempre profissional, direto e focado no negócio do cliente.
`;

export const streamGeminiResponse = async (
  history: Message[],
  onChunk: (text: string) => void,
  onComplete: () => void,
  onError: (error: Error) => void
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    // Using gemini-3-pro-preview as requested for complex tasks
    const model = 'gemini-3-pro-preview';

    // Convert internal message format to API format
    // We only send the last few messages to maintain context window efficiency, 
    // but for this demo, we can send the whole history.
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // MANDATORY: Thinking Budget for complex reasoning
        // We do NOT set maxOutputTokens here as per instructions when using thinkingBudget
        thinkingConfig: {
          thinkingBudget: 32768
        }, 
      },
      history: chatHistory.slice(0, -1) // All except the last one which is the new message
    });

    const lastMessage = history[history.length - 1];

    const result = await chat.sendMessageStream({
      message: lastMessage.text
    });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }

    onComplete();
  } catch (error) {
    console.error("Gemini API Error:", error);
    onError(error instanceof Error ? error : new Error("Unknown error"));
  }
};
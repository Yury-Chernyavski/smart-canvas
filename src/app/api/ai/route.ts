import { NextRequest } from "next/server"

const MOCK_RESPONSE = `Вот несколько идей для развития этой темы:

1. Начни с малого — разбей большую идею на конкретные шаги
2. Найди похожие примеры и проанализируй их
3. Обсуди идею с кем-то — свежий взгляд помогает
4. Поставь дедлайн — идеи без срока остаются идеями
5. Запиши возможные препятствия заранее`


export async function POST(req: NextRequest) {
	const { content } = await req.json()

	if (!content) {
		return new Response("Content is required", { status: 400 })
	}

	const stream = new ReadableStream({
		async start(controller) {
			for (const char of MOCK_RESPONSE) {
				const message = `data: ${JSON.stringify(char)} \n\n`
				controller.enqueue(new TextEncoder().encode(message))
				await new Promise(res => setTimeout(res, 30))
			}

			controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
			controller.close()
		}
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		}
	})
}

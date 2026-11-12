import { useState } from "react"

export const useAiSuggestion = (noteContent: string) => {
	const [text, setText] = useState<string>("")
	const [isStreaming, setIsStreaming] = useState<boolean>(false)

	const handleExpand = async () => {
		setText("")
		setIsStreaming(true)

		const response = await fetch("/api/ai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: noteContent }),
		})

		const reader = response.body!.getReader()
		const decoder = new TextDecoder()

		while (true) {
			const { done, value } = await reader.read()

			if (done) break

			const chunk = decoder.decode(value)
			const lines = chunk.split("\n").filter((line) => line.startsWith("data: "))

			for (const line of lines) {
				const data = line.replace("data: ", "")

				if (data === "[DONE]") {
					setIsStreaming(false)
					return
				}

				const parsedData = JSON.parse(data)
				setText((prev) => prev + parsedData)
			}
		}
	}

	const state = {
		text,
		isStreaming,
	}

	const headers = {
		handleExpand,
	}

	return [state, headers] as [typeof state, typeof headers]
}

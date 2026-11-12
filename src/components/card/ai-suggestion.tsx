"use client"

interface IAiSuggestionProp {
	isStreaming: boolean
	handleExpand: () => Promise<void>
}

export const AiSuggestion = ({ isStreaming, handleExpand }: IAiSuggestionProp) => {
	// const [text, setText] = useState<string>("")
	// const [isStreaming, setIsStreaming] = useState<boolean>(false)

	// const handleExpand = async () => {
	// 	setText("")
	// 	setIsStreaming(true)

	// 	const response = await fetch("/api/ai", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ content: noteContent }),
	// 	})

	// 	const reader = response.body!.getReader()
	// 	const decoder = new TextDecoder()

	// 	while (true) {
	// 		const { done, value } = await reader.read()

	// 		if (done) break

	// 		const chunk = decoder.decode(value)
	// 		const lines = chunk.split("\n").filter((line) => line.startsWith("data: "))

	// 		for (const line of lines) {
	// 			const data = line.replace("data: ", "")

	// 			if (data === "[DONE]") {
	// 				setIsStreaming(false)
	// 				return
	// 			}

	// 			const parsedData = JSON.parse(data)
	// 			setText((prev) => prev + parsedData)
	// 		}
	// 	}
	// }

	return (
		<div>
			<button
				type="button"
				onClick={handleExpand}
				disabled={isStreaming}
				className="text-xs text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-50">
				{isStreaming ? "Generate..." : "✨ Explore idea"}
			</button>
		</div>
	)
}

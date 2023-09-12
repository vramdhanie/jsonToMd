export function convertParagraphToMd(paragraph: any, noBreak: boolean = false): string {
    return paragraph.elements.map((element: any) => noBreak ? element.textRun.content.trim().replaceAll(/\n|\t/gi, '') : element.textRun.content).join('')
}

export function convertTableToMd(table: any): string {
    const { rows, columns, tableRows } = table
    const separator = Array(+columns + 1).fill('|').join('---')

    const markdownRows = tableRows.map((row: any) => {
        return ['|', '|'].join(row.tableCells.map((cell: any) => {
            const result = cell.content.map((item: any) => {
                if ("paragraph" in item) {
                    return convertParagraphToMd(item.paragraph, true)
                } else if ("table" in item) {
                    return convertTableToMd(item.table)
                } else {
                    return ''
                }
            }).join(' ')
            return result
        }).join('|'))
    })
    if (markdownRows.length > 0) {
        markdownRows.splice(1, 0, separator)
    }

    return markdownRows.join('\n')
}

export function jsonToMd(json: string): string {
    try {
        const data = JSON.parse(json)
        const content = data.body.content
        const result = content.map((item: any) => {
            if ("paragraph" in item) {
                return convertParagraphToMd(item.paragraph)
            } else if ("table" in item) {
                return convertTableToMd(item.table)
            } else {
                return ''
            }
        }).filter((item: any) => !!item).join('\n')

        return result
    } catch (e) {
        return ''
    }
}
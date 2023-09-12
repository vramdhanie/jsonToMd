import { jsonToMd } from '../index'
import { para1, para2, para3, table1 } from '../data'
describe('JSON to Markdown', () => {
    it('should return empty string for empty string', () => {
        expect(jsonToMd('')).toBe('')
    })

    it('should extract text from paragraph element', () => {
        const input = JSON.stringify(para1)
        const expected = "I'm a paragraph\n"
        expect(jsonToMd(input)).toBe(expected)
    })

    it('should ignore non-paragraph element', () => {
        const input = JSON.stringify(para2)
        const expected = "I'm a paragraph\n"
        expect(jsonToMd(input)).toBe(expected)
    })

    it('should handle multiple paragraphs', () => {
        const input = JSON.stringify(para3)
        const expected = "I'm a paragraph\n\nA second: (and third)\n"
        expect(jsonToMd(input)).toBe(expected)
    })

    it('should handle a table', () => {
        const input = JSON.stringify(table1)
        const expected = [
            "|Bleep|Supported?|Notes|",
            "|---|---|---|",
            "|A stand alone paragraph|Eh?|Part of a table|",
            "|A paragraph|No|Some strange -> characters|",
            "|A paragraph|Yes*|This is a special tab character:A Paragraph Some more special chars|",
            "|That's the right thing||A paragraph: That is cool What a way to do things How's it going?|",
            "|A paragraph|||",
            "|A paragraph|||",
            "|What next|No|See comment|",
            "|With some quotes \"Quoted.\"|||",
            "|With fancy quotes “Fancy”|||",
            "|A paragraph|||",
            "|A paragraph|||",
            "|Start some other list:https://www.google.com?s=225515ad0f824ef8920e9a4db7c7abbf&pvs=4|||",
            "|A paragraph|||",

        ].join('\n')
        expect(jsonToMd(input)).toBe(expected)
    })
})
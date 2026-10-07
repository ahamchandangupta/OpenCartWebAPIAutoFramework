
import XLXS from 'xlsx';



export class XlsxHelper {

    static readXlsx(filePath: string, sheetName: string): Record<string, string>[] {

        const workBook = XLXS.readFile(filePath);
        const sheet = workBook.Sheets[sheetName];

        return XLXS.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });

    }


}

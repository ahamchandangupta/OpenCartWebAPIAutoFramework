
import { parse } from "csv-parse/sync";
import fs from "fs";



export class CsvHelper {

    static readCSV(filePath: string): Record<string, string>[] {

        return parse(fs.readFileSync(filePath, 'utf-8'), {
            columns: true,
            skip_empty_lines: true,
            trim: true
        }) as Record<string, string>[]

    }

}
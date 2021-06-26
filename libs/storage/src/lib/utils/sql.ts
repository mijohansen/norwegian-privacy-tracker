
export function insertIgnore(table: string, obj: any): [string, any[]] {
    const keys = Object.keys(obj).join(",")
    const placeholders = Object.keys(obj).map(() => "?").join(",")
    const statement = `
    
    INSERT IGNORE INTO ${table} 
    (${keys}) 
    values (${placeholders})
    `

    return [
        statement.replace( /\s\s+/g, ' ' ).trim(),
        Object.values(obj)
    ]

}

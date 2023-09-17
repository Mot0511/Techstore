import ItemType from "../types/ItemType";

export const fetchItemsTransform = (data: any): ItemType[] => {
    const items: ItemType[] = []
    for (let i in data) {
        let cat = data[i]
        cat.map((item: ItemType) => {
            items.push(item)
        })
    }
    return items
}
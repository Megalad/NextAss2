import { useEffect, useRef, useState } from "react";

export function Items() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1); // Added state for pagination
    const itemNameRef = useRef();
    const itemCategoryRef = useRef();
    const itemPriceRef = useRef();

    // 1. Load Items from Backend with Pagination
    async function loadItems() {
        try {
            // Updated URL to include pagination query parameters
            const response = await fetch(`http://localhost:3000/api/item?page=${page}`);
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.error("==> err : ", err);
            alert("Loading items failed");
        }
    }

    async function onDelete(id) {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const uri = `http://localhost:3000/api/item/${id}`; 
            const result = await fetch(uri, { method: "DELETE" });
            if (result.ok) {
                loadItems(); 
            } else {
                alert("Delete failed");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    }

    // 3. Save New Item with required properties
    async function onItemSave() {
        const uri = "http://localhost:3000/api/item";
        const body = {
            name: itemNameRef.current.value,
            category: itemCategoryRef.current.value,
            price: itemPriceRef.current.value,
            // Backend will handle adding status: "ACTIVE"
        };
        
        await fetch(uri, {
            method: "POST",
            body: JSON.stringify(body) // Stringify is required
        });
        loadItems(); // Refresh list after insert
    }

    // Reload items whenever the page number changes
    useEffect(() => { 
        console.log("==> Init...");
        loadItems(); 
    }, [page]); 

    return (
        <>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemCategory}</td>
                            <td>{item.itemPrice}</td>
                            <td>
                                {/* Navigation to edit page */}
                                <a href={`/items/${item._id}`}>Edit</a>
                                <button onClick={() => onDelete(item._id)} style={{marginLeft: "10px"}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>-</td>
                        <td><input type="text" ref={itemNameRef}/></td>
                        <td>
                            <select ref={itemCategoryRef}>
                                <option>Stationary</option>
                                <option>Kitchenware</option>
                                <option>Appliance</option>
                            </select>
                        </td>
                        <td><input type="text" ref={itemPriceRef}/></td>
                        <td><button onClick={onItemSave}>Add Item</button></td>
                    </tr>
                </tbody>
            </table>

            {/* Pagination Controls required by instructions */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
                <span style={{ margin: "0 15px" }}>Page {page}</span>
                <button onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </>
    );
}
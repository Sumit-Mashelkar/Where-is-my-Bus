// contains the page for adding new bus routes
import Hero from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";

const emptyForm = {
    bus_name: "",
    bus_number: "",
    from_city: "",
    to_city: "",
    departure: "",
};

const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "15px",
};

const AddRoutesPage = () => {
    const [form, setForm] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({ ...currentForm, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/buses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to save this bus.");
            }

            setSuccessMessage(`${data.bus_name} was saved.`);
            setForm({ ...emptyForm });
        } catch (error) {
            setErrorMessage(error.message || "Unable to connect to the backend.");
        } finally {
            setIsSaving(false);
        }
    };

    return(
        <>
        <Hero />
        <main style={{ width: "min(92%, 560px)", margin: "40px auto 64px" }}>
            <h1 style={{ marginBottom: "8px", color: "#0f172a" }}>Add a bus</h1>
            <p style={{ marginTop: 0, color: "#475569" }}>Save the bus name, number, route, and departure time.</p>
            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: "14px", padding: "24px", border: "1px solid #e2e8f0", borderRadius: "12px" }}
            >
                <label style={{ display: "grid", gap: "6px", color: "#334155" }}>
                    Bus name
                    <input name="bus_name" value={form.bus_name} onChange={handleChange} style={fieldStyle} required />
                </label>
                <label style={{ display: "grid", gap: "6px", color: "#334155" }}>
                    Bus number
                    <input name="bus_number" value={form.bus_number} onChange={handleChange} style={fieldStyle} required />
                </label>
                <label style={{ display: "grid", gap: "6px", color: "#334155" }}>
                    From
                    <input name="from_city" value={form.from_city} onChange={handleChange} style={fieldStyle} required />
                </label>
                <label style={{ display: "grid", gap: "6px", color: "#334155" }}>
                    To
                    <input name="to_city" value={form.to_city} onChange={handleChange} style={fieldStyle} required />
                </label>
                <label style={{ display: "grid", gap: "6px", color: "#334155" }}>
                    Departure
                    <input type="time" name="departure" value={form.departure} onChange={handleChange} style={fieldStyle} required />
                </label>
                <button
                    type="submit"
                    disabled={isSaving}
                    style={{ padding: "12px 14px", border: 0, borderRadius: "8px", background: "#2563eb", color: "#ffffff", fontWeight: 700, cursor: isSaving ? "wait" : "pointer" }}
                >
                    {isSaving ? "Saving..." : "Save bus"}
                </button>
                {errorMessage && <p role="alert" style={{ margin: 0, color: "#b91c1c" }}>{errorMessage}</p>}
                {successMessage && <p role="status" style={{ margin: 0, color: "#15803d" }}>{successMessage}</p>}
            </form>
        </main>
        <Footer />
        </>
    )

}
export default AddRoutesPage;
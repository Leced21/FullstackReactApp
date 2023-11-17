import { useEffect, useState } from "react"
import { closeModal, entry, updateAppointment } from "./Lib"



export default function Edit(props) {

    const [done_, setDone_] = useState(false)
    const [deleted_, setDeleted_] = useState(false)
    const [importance, setImportance] = useState(0)

    const editApp = (e) => {
        const name_ = e.target.name
        let v_ = e.target.value

        if (name_ === "done") {
            v_ = e.target.checked
            setDone_(v_)
        }
        if (name_ === "deleted") {
            v_ = e.target.checked
            setDeleted_(v_)
        }

        if (name_ === "date") {
            v_ = new Date(v_)
        }

        if (name_ === "levelOfImportance") {
            v_ = Number(v_)
            setImportance(v_)
        }
        entry[name_] = v_
    }

    const updateApp = () => {
        console.log("Entry before update:", entry)
        return
        updateAppointment(entry).then(r => console.log("Updated successfully:", r))
            .catch(e => console.log("could not update the appointment:", e))
        closeModal("edit-modal")
    }

    useEffect(() => {
        console.log("Edit component")
        setDone_(entry.done)
        setDeleted_(entry.deleted)
        setImportance(entry.levelOfImportance)
    }, [props.stateListener])
    return (
        <div className="modal-container">
            <div className="modal-title">Edit Appointment</div>

            <div>
                <label htmlFor="Title_e">Title</label><br />
                <input type="text" id="Title_e" className="mt-5" maxLength={150} name="title" onChange={editApp} />
                <span className="ms-10">0/150</span>
            </div>

            <div className="mt-15">
                <label htmlFor="Description_e">Description</label><br />
                <textarea id="Description_e" maxLength={300} name="description" className="mt-5" cols={102} rows={10} onChange={editApp}></textarea> <br />
                <span className="float-right me-10">0/300</span>
            </div>

            <div className="row mt-15">
                <label htmlFor="Address_e">Address</label>
                <input type="text" id="Address_e" maxLength={100} name="address" onChange={editApp} />
            </div>

            <div className="ms-10">
                <label htmlFor="levelOfImportance_e">Importance</label><br />
                <select id="levelOfImportance_e" name="levelOfImportance" value={importance} onChange={editApp} >
                    <option value={5}>Very High</option>
                    <option value={4}>High</option>
                    <option value={3}>Medium</option>
                    <option value={2}>Normal</option>
                    <option value={1}>Low</option>
                    <option value={0}>Very Low</option>
                </select>
            </div>

            <div className="row mt-15 items-center">
                <div>
                    <label htmlFor="Date_e">Date</label>
                    <input type="date" id="Date_e" name="date" onChange={editApp} />
                </div>
                <div>
                    <label htmlFor="Time_e">Time</label>
                    <input type="time" id="Timee_e" name="time" onChange={editApp} />
                </div>

                <div className="ms-10 row items-center">
                    <label htmlFor="Done_e">Done</label>
                    <input type="checkbox" id="Done_e" name="done" checked={done_} onChange={editApp} />
                </div>
                <div className="ms-10 row items-center">
                    <label htmlFor="Deleted_e">Deleted</label>
                    <input type="checkbox" id="Deleted_e" name="deleted" checked={deleted_} onChange={editApp} />
                </div>
            </div>

            <div className="row justify-btw modal-action-container mt-15">
                <div className="btn" onClick={() => closeModal("edit-modal")} >Cancel</div>
                <div className="btn" onClick={updateApp} >Update</div>
            </div>
        </div>

    )
}
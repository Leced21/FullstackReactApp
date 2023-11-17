import React, { useState } from "react";
import { closeModal, entry, formatedDateToStr, formatedTimeToStr, postAppointment } from "./Lib";

export default function New(props) {

    const [titleLength, setTitleLength] = useState(0)
    const [desLength, setDesLength] = useState(0)
    const [addrLength, setAddrLength] = useState(0)
    const newApp = (e) => {
        const name_ = e.target.name
        let v_ = e.target.value

        if (name_ === "title") {
            setTitleLength(v_.length)
        }
        if (name_ === "description") {
            setDesLength(v_.length)
        }
        if (name_ === "address") {
            setAddrLength(v_.length)
        }

        if (name_ === "date") {
            v_ = new Date(v_)
        }

        if (name_ === "levelOfImportance") {
            v_ = Number(v_)
        }
        entry[name_] = v_
    }

    const postApp = () => {
        postAppointment(entry).then(r => {
            console.log("Created successfully:", r)
            props.refreshApp(Math.random() * 125 * Math.random())
        }).catch(e => console.log("Error happened at posting new app:", e))

        closeModal("new-modal")
    }
    return (
        <div className="modal-container">
            <div className="modal-title">New Appointment</div>

            <div className="mt-15">
                <label htmlFor="Title_n">Title</label><br />
                <input type="text" id="Title_n" className="mt-5" maxLength={150} name="title" onChange={newApp} />
                <span className="ms-10">{titleLength}/150</span>
            </div>

            <div className="mt-15">
                <label htmlFor="Description_n">Description</label><br />
                <textarea id="Description_n" maxLength={300} name="description" onChange={newApp} className="mt-5" cols={102} rows={10}></textarea> <br />
                <span className="float-right me-10">{desLength} /300</span>
            </div>

            <div className="row mt-25">
                <label htmlFor="Address_n">Address</label>
                <input type="text" id="Address_n" maxLength={100} onChange={newApp} name="address" />
                <span className="ms-10">{addrLength} /100</span>
            </div>

            <div className="ms-10">
                <label htmlFor="levelOfImportance_n">Importance</label><br />
                <select id="levelOfImportance_n" name="levelOfImportance" onChange={newApp} defaultValue={2} >
                    <option value={5}>Very High</option>
                    <option value={4}>High</option>
                    <option value={3}>Medium</option>
                    <option value={2}>Normal</option>
                    <option value={1}>Low</option>
                    <option value={0}>Very Low</option>
                </select>
            </div>

            <div className="row mt-15">
                <div>
                    <label htmlFor="Date_n">Date</label>
                    <input type="date" id="Date_n" name="date" defaultValue={formatedDateToStr()} onChange={newApp} />
                </div>

                <div className="ms-10">
                    <label htmlFor="Time_n">Time</label>
                    <input type="time" id="Time_n" name="time" defaultValue={formatedTimeToStr()} onChange={newApp} />
                </div>
            </div>
            <div className="row justify-btw modal-action-container mt-15">
                <div className="btn" onClick={() => closeModal("new-modal")}>Cancel</div>
                <div className="btn" onClick={postApp}>Add</div>
            </div>
        </div>


    )
}
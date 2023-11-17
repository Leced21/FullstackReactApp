

export const testData = [
   { ID: 1, Title: "Title one", Description: "Description one", LevelOfImportance: 3, Data: "14-04-2023" },
   { ID: 2, Title: "Title two", Description: "Description two", LevelOfImportance: 3, Data: "13-04-2023" },
   { ID: 3, Title: "Title three", Description: "Description three", LevelOfImportance: 3, Data: "12-04-2023" },
   { ID: 4, Title: "Title four", Description: "Description four", LevelOfImportance: 3, Data: "10-04-2023" }


]



export const entry = {
   title: "Test title",
   description: "Test description",
   address: "Test address",
   date: new Date(),
   time: formatedTimeToStr(),
   done: false,
   deleted: false,
   levelOfImportance: 2,
}

export const filter = {
   LevelOfImportance: null,
   All: false,
   Deleted: false,
   Done: false,
   StartDate: null,
   EndDate: null,
   SpecifiedDate: null,
   SpecifiedTime: null,
};
export const activeId = {
   id: 0
}

const url = "api/appointment"
export async function getDefault() {
   const res = await fetch(url)

   if (!res.ok && res.status !== 200) {
      console.log("It sucked at getting default data:", res)
      notifyUser("Something went wrong, please refresh the page.")
      return []
   }

   const result = await res.json()
   return result
}

export async function postAppointment(newApp) {
   const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newApp),
      headers: {
         "content-type": "application/json"
      }
   })

   if (!res.ok) {
      console.log("It sucked at creating new appointment:", res)
      notifyUser("we could not create your appointment, please try again.")
      return { msg: res }
   }

   return await res.json()
}

export async function updateAppointment(updateApp) {
   const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(updateApp),
      headers: {
         "content-type": "application/json"
      }
   })

   if (!res.ok) {
      console.log("It sucked at updating appointment:", res)
      notifyUser("we could not update your appointment, please try again.")
      return { msg: res }
   }

   return await res.json()
}


export async function deleteAppointment(id) {
   const res = await fetch(url + "/" + id, {
      method: "DELETE"
   })

   if (!res.ok) {
      console.log("It sucked at deleting appointment:", res)
      notifyUser("Something went wrong, please refresh the page.")
      return { msg: res }
   }
   return await res.json()
}


export function notifyUser(msg) {
   const notificationEl = document.querySelector(".notifications")
   notificationEl.innerHTML = msg ? msg : ""
   if (msg)
      setTimeout(() => {
         notificationEl.innerHTML = ""
      }, 1200);
}

export function openModal(modal) {
   const modal_ = document.querySelector("." + modal)
   if (modal_) {
      modal_.classList.remove("hidden")
   }
}

export function closeModal(modal) {
   const modal_ = document.querySelector("." + modal)
   if (modal_) {
      modal_.classList.add("hidden")
   }
}

export function formatedDateToStr(d) {
   const nd = d ? new Date(d) : new Date();
   const month_ = nd.getMonth() + 1;
   const monthStr = month_ > 9 ? month_ : 0 + "" + month_;
   const day_ = nd.getDate() > 9 ? nd.getDate() : 0 + "" + nd.getDate();
   return nd.getFullYear() + "-" + monthStr + "-" + day_;
}

export function formatedTimeToStr(d) {
   const nd = d ? new Date(d) : new Date();
   const hr_ = nd.getHours() < 9 ? 0 + "" + nd.getHours() : nd.getHours();
   const min_ = nd.getMinutes() < 9 ? 0 + "" + nd.getMinutes() : nd.getMinutes();
   return hr_ + ":" + min_;
}
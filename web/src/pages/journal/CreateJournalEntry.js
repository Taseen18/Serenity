import React, { useState } from 'react'
import { supabase } from "../../lib/helper/supabaseClient";
import { useAuth } from '../../lib/helper/AuthContext';
import Navbar from "../../components/Navbar"

function CreateJournalEntry (prevTitle, prevEntry) {
    const [entry, setEntry] = useState('')
    const [title, setTitle] = useState('')
    const [formError, setFormError] = useState(null)

    const { token } = useAuth();
    const user_id = token.user.id;

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!entry || !title) {
            setFormError("Please fill in all the fields correctly")
            return
        }

        const Today = new Date()

        console.log(user_id)

        const {data, error} = await supabase.from('journal').insert([{user_id: user_id, title: title, entry: entry, date_added: Today}])

        if (error) {
                console.log(error)
        }
        if (data) {
                console.log(data)
        }
    }
    return (
        <div className="Journal">
           <Navbar/>

           <div>
                <h2>Create an entry</h2>

                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                    id="entry"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    />
                    <button type="submit">Save Entry</button>
                </form>
           </div>
        </div>
    )
}

export default CreateJournalEntry
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Checkbox from './Checkbox';

function Create() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", dob: "", location: "", team: "", gender: "",
        sports: "", about: "", interests: "", profileImage: ""
    })

    //For uploading a file/image.
    const fileToDataUri = (data) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(data);
    })

    const onChange = (data) => {
        if (!data) {
            updateForm({ profileImage: "" })
            return;
        }
        fileToDataUri(data)
            .then(file => {
                updateForm({ profileImage: file })
            })
    }

    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //This snippet is handling the submission.
    async function onSubmit(e) {
        e.preventDefault();

        //When a post request is sent to the create URL, I will add a new record to the database
        const newData = { ...form };

        await fetch("https://demo-psi-gold.vercel.app/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({
            name: "",
            dob: "",
            location: "",
            team: "",
            gender: "",
            sports: "",
            about: "",
            interests: "",
            profileImage: ""
        });
        navigate("/")
    }

    const updateSports = (games) => {
        updateForm({ sports: games })
    }

    return (
        <div>
            <h3 className='text-center'>Athlete Profile</h3>
            <form onSubmit={onSubmit} className="w-50 m-auto">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date Of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={form.dob}
                        onChange={(e) => updateForm({ dob: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="location">Locations:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={form.location}
                        onChange={(e) => updateForm({ location: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="team">Teams:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="team"
                        value={form.team}
                        onChange={(e) => updateForm({ team: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={form.gender}
                        onChange={(e) => updateForm({ gender: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <div className="sports_game">
                        <Checkbox updateGames={updateSports} />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="about">About:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="about"
                        value={form.about}
                        onChange={(e) => updateForm({ about: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="interests">Interest:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="interests"
                        value={form.interests}
                        onChange={(e) => updateForm({ interests: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        onChange={(event) => onChange(event.target.files[0] || null)}
                    />
                    {form?.profileImage && <img width="25" height="25" src={form?.profileImage} alt="avatar" />}
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Profile"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
}

export default Create;

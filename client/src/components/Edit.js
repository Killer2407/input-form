import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from './Checkbox'

function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", dob: "", location: "", team: "", gender: "",
        sports: "", about: "", interests: "", profileImage: ""
    })

    //To upload a file.
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

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:4000/api/getById/${params.id.toString()}`);
            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const api = await response.json();
            if (!api) {
                window.alert(`API with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(api[0]);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    //This is going to update the state properties.
    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const updateSports = (games) => {
        updateForm({ sports: games })
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPortfolio = {
            name: form.name,
            dob: form.dob,
            location: form.location,
            team: form.team,
            gender: form.gender,
            sports: form.sports,
            about: form.about,
            interests: form.interests,
            profileImage: form.profileImage
        };

        // This will send a post request to update data in the database.
        await fetch(`http://localhost:4000/api/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(editedPortfolio),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate("/");
    }

    return (
        <>
            <div>
                <h3 className='text-center'>Update Profile of Athlete</h3>
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
                            value="Update Profile"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit

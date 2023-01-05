import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [month, day, year].join('-');
}

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{formatDate(props.record.dob)}</td>
    <td>{props.record.location}</td>
    <td>{props.record.team}</td>
    <td>{props.record.gender}</td>
    <td>{props.record.sports}</td>
    <td>{props.record.about}</td>
    <td>{props.record.interests}</td>
    <td> <img width="200" height="200" src={props.record.profileImage} alt="avatar" /></td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:4000/api/getAllAthlete`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records.data);
    }
    getRecords();

    return;
  }, [records.length]);

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>List of the Athlete</h3>
      <table className="table table-striped" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Location</th>
            <th>Team</th>
            <th>Gender</th>
            <th>Sports</th>
            <th>About</th>
            <th>Interests</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}

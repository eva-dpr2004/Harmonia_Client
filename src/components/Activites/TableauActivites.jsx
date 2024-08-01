import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Tableau.css'

function TableauActivites() {
  return (
    <div className='TableauActivites'>
      <h2 className='title-activites'>Gérez les activités de vos animaux</h2>
      <button>+ Activités</button>
      <div className='tableau'>
        <table>
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Début de l'activité</th>
              <th>Fin de l'activité</th>
              <th>Durée de l'activité (h et min)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <EditIcon className="actions" />
                  <DeleteIcon className="actions" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='choice'>
        <label htmlFor="choix">Choix :</label>
          <select id="choix" name="choix">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
    </div>
  );
}

export default TableauActivites;

const db = require("../db/mysql.config");

const insertPhysicians = async (physician) => {
  const { physician_first_name, physician_last_name } = physician;

  const insertQuery = `INSERT INTO physicians
        ( physician_first_name,  physician_last_name)
        VALUES 
        (?, ?)`;

  try {
    await db.query(insertQuery, [physician_first_name, physician_last_name]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return {
    success: "User registered",
  };
};

const getPhysicians = async () => {
  const getPhysiciansQuery = "SELECT * FROM physicians";

  let resp;

  try {
    resp = await db.query(getPhysiciansQuery);
  } catch (err) {
    return {
      error: err,
    };
  }

  return resp[0];
};

const patientAvailability = async (patient) => {
  const { scheduled_date, scheduled_time, physician_id } = patient;

  const availabilityQuery = `SELECT * FROM appointments WHERE physician_id = ? AND scheduled_date = ? AND scheduled_time = ?`;

  try {
    resp = await db.query(availabilityQuery, [
      physician_id,
      scheduled_date,
      scheduled_time,
    ]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return resp[0];
};

const createAppointment = async (patient) => {
  const {
    patient_first_name,
    patient_last_name,
    scheduled_date,
    scheduled_time,
    kind,
    physician_id,
  } = patient;

  let resp;

  const insertQuery = `INSERT INTO appointments
        ( patient_first_name,  patient_last_name, scheduled_date, scheduled_time, kind, physician_id)
        VALUES 
        (?, ?, ?, ?, ?, ?)`;

  try {
    await db.query(insertQuery, [
      patient_first_name,
      patient_last_name,
      scheduled_date,
      scheduled_time,
      kind,
      physician_id,
    ]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return {
    success: "Appointment successfully registered",
  };
};

const getAppointments = async (body) => {
  const { physician_id, scheduled_date } = body;
  let resp;

  const insertQuery =
    "SELECT * FROM appointments WHERE physician_id = ? AND scheduled_date = ?";

  try {
    resp = await db.query(insertQuery, [physician_id, scheduled_date]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return resp[0];
};

const deleteAppointment = async (appointmentId, physicianId) => {
  let resp;

  const deleteQuery =
    "DELETE FROM appointments WHERE physician_id = ? AND appointment_id = ?";

  try {
    resp = await db.query(deleteQuery, [physicianId, appointmentId]);
  } catch (err) {
    return {
      error: err,
    };
  }

  return {
    success: "User deleted successfully",
  };
};

module.exports = {
  insertPhysicians,
  getPhysicians,
  createAppointment,
  deleteAppointment,
  getAppointments,
  patientAvailability,
};

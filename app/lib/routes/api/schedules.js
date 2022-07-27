const express = require("express"),
  router = express.Router(),
  {
    insertPhysicians,
    getPhysicians,
    createAppointment,
    getAppointments,
    deleteAppointment,
    patientAvailability,
  } = require("../../controller/appointment"),
  { validTime } = require("../../middleware/timeCheck");

/**
 * @swagger
 *
 * definitions:
 *      insertPhysician:
 *          type: object
 *          description: Physician's information
 *          properties:
 *              physician_first_name:
 *                  type: string
 *                  example: Julius
 *              physician_last_name:
 *                  type: string
 *                  example: Hibbert
 *      insertAppointment:
 *          type: object
 *          description: Patient's appointment
 *          properties:
 *              patient_first_name:
 *                  type: string
 *                  example: John
 *              patient_last_name:
 *                  type: string
 *                  example: Doe
 *              scheduled_date:
 *                  type: string
 *                  example: 2018-09-05
 *              scheduled_time:
 *                  type: string
 *                  example: 8:00AM
 *              kind:
 *                  type: string
 *                  example: New Patient
 *              physician_id:
 *                  type: number
 *                  example: 1
 *      receiveAppointments:
 *          type: object
 *          description: Reveive appointments
 *          properties:
 *              physician_id:
 *                  type: number
 *                  example: 1
 *              scheduled_date:
 *                  type: string
 *                  example: 2018-09-05
 *
 */

/**
 * @swagger
 *
 *  /api/schedules/physicians:
 *
 *  post:
 *      description: Register a new physician_
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name:  Physician_to insert
 *            description:  physician_first and last name
 *            required: true
 *            schema:
 *              $ref: '#/definitions/insertPhysician'
 *      responses:
 *          200:
 *              description: Physician registered successfully
 *          400:
 *              description: Registration failed
 */

router.post("/physicians", async (req, res, next) => {
  const resp = await insertPhysicians(req.body);

  if (resp.error) {
    return next(new Error(resp.error));
  }

  res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/schedules/physicians:
 *
 *  get:
 *      description: Get all physicians
 *      responses:
 *          200:
 *              description: Received all physicians
 *          400:
 *              description: Failed to get phsyicians
 */

router.get("/physicians", async (req, res, next) => {
  let resp;

  resp = await getPhysicians();

  if (resp.error) {
    return next(new Error(resp.error));
  }

  return res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/schedules/receiveAppointments:
 *
 *  post:
 *      description: Get a list of appointments from particular doctor on a certain day
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name:  Get appointments
 *            description:  Get list of appointments from doctor and certain day
 *            required: true
 *            schema:
 *              $ref: '#/definitions/receiveAppointments'
 *      responses:
 *          200:
 *              description: Received appointments
 *          400:
 *              description: Failed to reveibe appointments
 */

router.post("/receiveAppointments", async (req, res, next) => {
  let resp;

  resp = await getAppointments(req.body);

  if (resp.error) {
    return next(new Error(resp.error));
  }

  return res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/schedules/appointments:
 *
 *  post:
 *      description: Create an appointment
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name:  Patient information
 *            description:  Patient info to schedule an appointment
 *            required: true
 *            schema:
 *              $ref: '#/definitions/insertAppointment'
 *      responses:
 *          200:
 *              description: Appointment registered successfully
 *          400:
 *              description: Appointment failed to register
 */

router.post("/appointments", validTime, async (req, res, next) => {
  let resp;

  const booked = await patientAvailability(req.body);

  if (booked.length >= 3) {
    return next(new Error("Physician is overbooked"));
  }

  resp = await createAppointment(req.body);

  if (resp.error) {
    return next(new Error(resp.error));
  }

  res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/schedules/appointments/{id}:
 *
 *  delete:
 *      description: Delete an existing appointment fron Docter's Calendar
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name:  Patient information
 *            description:  Patient info to schedule an appointment
 *            required: true
 *            type: object
 *            properties:
 *                physician_id:
 *                  type: number
 *                  example: 1
 *          - in: path
 *            name: id
 *            description: The id of appointment
 *            required: true
 *            type: number
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          400:
 *              description: User deletion failed
 */

router.delete("/appointments/:id", async (req, res, next) => {
  let resp;

  resp = await deleteAppointment(req.params.id, req.body.physician_id);

  if (resp.error) {
    return next(new Error(resp.error));
  }

  return res.status(200).send(resp);
});

module.exports = router;


import pool from '../../../db.js';

export async function post({ request }) {
  const { email, password } = await request.json();

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
      return {
        status: 200,
        body: {
          message: 'Inicio de sesión exitoso',
          user: {
            email: rows[0].email,
            name: rows[0].name
          }
        }
      };
    } else {
      return {
        status: 401,
        body: {
          message: 'Correo electrónico o contraseña incorrectos'
        }
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        message: 'Error en el servidor',
        error: error.message
      }
    };
  }
}
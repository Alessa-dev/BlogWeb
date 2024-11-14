
import pool from '../../../db.js';

export async function post({ request }) {
  const { title, image, content } = await request.json();

  try {
    const [result] = await pool.query(
      'INSERT INTO recipes (title, image, content) VALUES (?, ?, ?)',
      [title, image, content]
    );

    return {
      status: 201,
      body: {
        message: 'Receta creada exitosamente',
        recipeId: result.insertId
      }
    };
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

export async function get({ request }) {
  try {
    const [rows] = await pool.query('SELECT * FROM recipes');

    return {
      status: 200,
      body: rows
    };
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

export async function put({ request }) {
  const { id, title, image, content } = await request.json();

  try {
    await pool.query(
      'UPDATE recipes SET title = ?, image = ?, content = ? WHERE id = ?',
      [title, image, content, id]
    );

    return {
      status: 200,
      body: {
        message: 'Receta actualizada exitosamente'
      }
    };
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

export async function del({ request }) {
  const { id } = await request.json();

  try {
    await pool.query('DELETE FROM recipes WHERE id = ?', [id]);

    return {
      status: 200,
      body: {
        message: 'Receta eliminada exitosamente'
      }
    };
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
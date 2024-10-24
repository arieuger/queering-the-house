import { json, error } from '@sveltejs/kit';
import { getDescriptionById } from '../../../services/map.service';

export async function GET({ params }) {
  const { id } = params;

  try {
    
    const descById = await getDescriptionById(id);
    const description = descById?.description;

    if (!description) {
      throw error(404, 'Description not found');
    }

    return json({ short_id: id, description });
  } catch (err) {
    console.error('Error fetching moment text:', err);
    throw error(500, 'Error fetching moment text');
  }
}

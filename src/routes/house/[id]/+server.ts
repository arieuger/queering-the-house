import { json, error } from '@sveltejs/kit';
import { getHouseInfoById } from '$lib/services/map.service';

export async function GET({ params }) {
  const { id } = params;

  try {
    
    const houseById = await getHouseInfoById(id);

    if (houseById === null) {
      throw error(404, 'Description not found');
    }

    return json({ 
      short_id: id, 
      description: houseById.description,
      license: houseById.license,
      address: houseById.address,
      sources: houseById.sources,
    });
    
  } catch (err) {
    console.error('Error fetching house text:', err);
    throw error(500, 'Error fetching house text');
  }
}

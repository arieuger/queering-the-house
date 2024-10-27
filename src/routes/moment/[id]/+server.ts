import { json, error } from '@sveltejs/kit';
import { getMomentInfoById } from '$lib/services/map.service';

export async function GET({ params }) {
  const { id } = params;

  try {
    
    const momentById = await getMomentInfoById(id);

    if (momentById === null) {
      throw error(404, 'Description not found');
    }

    return json({ 
      short_id: id, 
      description: momentById.description,
      license: momentById.license,
      address: momentById.address,
      sources: momentById.sources,
    });
    
  } catch (err) {
    console.error('Error fetching moment text:', err);
    throw error(500, 'Error fetching moment text');
  }
}

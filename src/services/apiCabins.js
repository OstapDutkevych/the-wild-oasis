import supabase from './supabase.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getCabins() {
  const { data: cabins, error } = await supabase
    .from('cabins')
    .select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl);
  const imageName =
    `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://xxvaxsiurxtavqoafjho.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1. Create/edit cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //B) EDIT

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      `Cabin could not be ${id ? 'updated' : 'created'}`,
    );
  }

  //2.Upload image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        'Image could not be uploaded, cabin was not created',
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

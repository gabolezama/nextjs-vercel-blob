export const getUploadedList = async () => {
    try {
        const response = await fetch('/api/read')
        const {blobs: list} = await response.json()
        return list
    } catch (error) {
        console.error(`Error on geting the list: ${error}`);
    }
}

export const handleDelete = async (url: string, name: string) => {
    try {
        const response = await fetch(`/api/delete?url=${encodeURIComponent(url)}`, {
            method: 'DELETE',
          });
    
          if (response.status === 200){
            console.log('Blob eliminado con éxito');
          } else {
            console.error('Error al eliminar el blob');
          }
    } catch (error) {
      console.error(`Error on attempting to delete: ${error}`);
    }
}
import URL from '../utils/url' 

export const fetchRevisiones = async (limit:any, start:any, search:any) => {
    console.log({limit, start, search})
    // start = start==0 ?0 :(start-1)*10
    try {
        const response = await fetch(`${URL}/rev/revision/${limit}/${start}/${search}`, {cache: 'no-store'});
        const {revision} = await response.json();
        console.log(revision.length)
        return revision;
    } catch (error) {
        console.error(error);
    }
};
 
 
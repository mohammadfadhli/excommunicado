export default function DateFormat(params){

    if(params.release_date != null)
    {
        const myDate = new Date(params.release_date);

        return `${myDate.getDate()}/${myDate.getMonth()+1}/${myDate.getFullYear()}`
    }

    return "No Date"

    
}
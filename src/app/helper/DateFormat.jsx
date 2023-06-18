export default function DateFormat(params){

    if(params.release_date != "")
    {
        const myDate = new Date(params.release_date);

        return `${myDate.getDate()}/${myDate.getMonth()+1}/${myDate.getFullYear()}`
    }

    return "Unknown"

    
}
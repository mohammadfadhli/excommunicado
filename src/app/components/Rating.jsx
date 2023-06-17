export default function Rating(params)
    {
        if (params.rating != "") {

            const r = parseFloat(params.rating.toFixed(1))
            
            if(r >= 7)
            {
                return <><h1 className="text-sm font-semibold text-green-700">{r.toFixed(1)}</h1></>
            }
            else if(r < 5)
            {
                return <><h1 className="text-sm font-semibold text-red-700">{r.toFixed(1)}</h1></>
            }
            else
            {
                return <><h1 className="text-sm font-semibold text-orange-700">{r.toFixed(1)}</h1></>
            }

            // return rating.toFixed(1);
        } else {
            return <><h1 className="text-sm font-semibold"></h1></>
        }
    }
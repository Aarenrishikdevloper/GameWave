import {Input} from "@/components/ui/input";
import {CopyButton} from "@/app/(dashboard)/u/[username]/keys/_components/CopyButton";

interface UrlCardprops {
    value:string | null;
}
const UrlCard = ({value}:UrlCardprops)=>{
    return(
        <div className={'rounded-lg bg-muted p-6'}>
            <div className={'flex items-center gap-x-10'}>
                <p className={"font-semibold shrink-0"}>
                    Server Url
                </p>
                <div className={"space-y-2 w-full"}>
                    <div className={"w-full flex items-center gap-x-2"}>
                        <Input value={value || ''} disabled placeholder={"Server Url"}/>
                        <CopyButton value={ value ||''}/>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default UrlCard
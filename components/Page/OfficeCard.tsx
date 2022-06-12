import { LocationOn, Phone} from "@mui/icons-material"

interface Props {
    name: string
    address: string
    phone: string
}

const OfficeCard = ({name, address, phone}: Props) => {
    return (
        <div className="w-96 h-40 bg-gray-100 rounded-lg space-y-2 text-gray-500 pl-4">
            <div className="font-bold pt-4">{name}</div>
            <div><LocationOn color="action"/>{address}</div>
            <div><Phone color="action"/>{phone}</div>
        </div>
    )
}

export default OfficeCard
import Drawer from "~/components/ui/Drawer";
import { RouteParams } from "~/lib/types";
import prisma from "~/lib/prisma"
import DashboardContainer from "~/components/ui/DashboardContainer";
import { FaMapMarkerAlt } from "react-icons/fa";

export default async function LocationList({
    params: { id }
}: RouteParams) {

    const associatedLocations = await prisma.location.findMany({
        where: {
            projects: {
                some: {
                    id
                }
            }
        },
        select: {
            id: true,
            locationName: true,
        }
    })

    return (
        <DashboardContainer
            headerText="Locations"
            headerIcon={<FaMapMarkerAlt />}
        >
            {
                associatedLocations.map(({ id, locationName }) => {
                    return (
                        <p key={id}>{locationName}</p>
                    )
                })
            }
        </DashboardContainer>
    )
}
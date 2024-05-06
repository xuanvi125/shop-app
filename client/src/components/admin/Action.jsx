import React from 'react'
import { IconButton } from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { ConfirmDeleteModal } from './CofirmDeleteModal'
import { Link } from 'react-router-dom'

export function Action({routeEdit, _id, manualRerender, deleteRow}) {
    return (
        <div className="flex items-center gap-3">
            <Link to={`${routeEdit}${_id}`}>
                <IconButton size="md" color='blue' >
                    <PencilIcon className="w-5 h-5" />
                </IconButton>
            </Link>

            <ConfirmDeleteModal id={_id} forceUpdate={manualRerender} deleteRow={deleteRow}/>
        </div>
    )
}

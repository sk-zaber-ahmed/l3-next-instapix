"use client"
import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import useMount from '@/hooks/useMount'
import { usePathname, useRouter } from 'next/navigation'
import Following from './Following'

type props = {
    followings: any;
    username: string;
}

function FollowingModal({
    followings,
    username,
}: props) {
    const mount = useMount();
    const pathname = usePathname();
    const router = useRouter();
    const isFollowersPage = pathname === `/dashboard/${username}/following`;
    console.log('from followers modal', username)

    if (!mount) return null;
    return (
        <Dialog
            open={isFollowersPage}
            onOpenChange={(isOpen) => !isOpen && router.push(`/dashboard/${username}`)}
        >
            <DialogContent className="dialogContent">
                <DialogHeader className="border-b border-zinc-300 dark:border-neutral-700 py-2 w-full">
                    <DialogTitle className="mx-auto font-bold text-base">
                        Following
                    </DialogTitle>
                </DialogHeader>

                {followings?.length === 0 && (
                    <p className="p-4 text-sm font-medium">This user has no followers.</p>
                )}

                <ScrollArea className="min-h-fit max-h-[350px]">
                    {followings?.map((following: any) => (
                        <Following key={following?._id} following={following} />
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default FollowingModal
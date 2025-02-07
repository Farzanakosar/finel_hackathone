"use server";

import { client } from "@/sanity/lib/client";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function clerkGetUser() {
    const { userId } = await auth();
    if (!userId) return null; // Agar userId nahi mili to null return karo

    const user = await currentUser();

    return {
        userId,
        userName: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
        userEmail: user?.externalAccounts?.[0]?.emailAddress || "",
        userImage: user?.imageUrl || "",
    };
}

export async function sanityUserPost() {
    const user = await clerkGetUser();
    if (!user) return null; // Agar user nahi mila to function yahin ruk jaye

    const userObject = {
        _type: "user",
        _id: `user-${user.userId}`,
        name: user.userName,
        email: user.userEmail,
        userId: user.userId,
        image: user.userImage,
    };

    return await client.createOrReplace(userObject);
}

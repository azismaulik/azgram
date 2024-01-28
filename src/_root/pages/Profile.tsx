import { useGetCurrentUser } from "@/lib/react-query/queries";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { data: currentUser } = useGetCurrentUser();
  console.log(currentUser);
  return (
    <div className="home-container">
      <div className="flex gap-8 items-center">
        <img
          src={currentUser?.imageUrl}
          alt="profile"
          className="w-28 h-28 rounded-full"
        />
        <div>
          <p className="text-xl font-bold">{currentUser?.name}</p>
          <p className="small-regular text-neutral-500">
            @{currentUser?.username}
          </p>
        </div>
      </div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
          <TabsTrigger defaultChecked className="bg-black" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Tab 1</TabsContent>
        <TabsContent value="password">Tab 2</TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

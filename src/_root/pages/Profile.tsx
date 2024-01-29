import { useGetCurrentUser, useGetUserById } from "@/lib/react-query/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const { data: user } = useGetUserById(id as string);
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="profile-container">
      <div className="flex gap-8 items-center">
        <div className="w-28 h-28 relative group">
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-full h-full rounded-full"
          />
          {id === currentUser?.$id && (
            <div className="absolute bottom-0 right-0 left-0 top-0 cursor-pointer">
              <div className="flex-center w-full h-full bg-black/50 rounded-full invisible group-hover:visible">
                <img
                  src="/assets/icons/edit.svg"
                  alt="camera"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="text-xl font-bold">{user?.name}</p>
          <p className="small-regular text-neutral-500">@{user?.username}</p>
        </div>
      </div>
      <p className="text-sm">{user?.bio || "no bio yet."}</p>
      <Tabs defaultValue="Post" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-neutral-950">
          <TabsTrigger value="Post">Post</TabsTrigger>
          <TabsTrigger value="Saved">Saved</TabsTrigger>
          <TabsTrigger value="Liked">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="Post">
          <div className="grid grid-cols-3">
            {user?.posts?.map((post: any, index: number) => (
              <Link to={`/posts/${post.$id}`} key={index}>
                <img
                  className="aspect-square object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Saved">
          <div className="grid grid-cols-3 gap-2">
            {user?.save?.map((post: any, index: number) => (
              <Link to={`/posts/${post.post.$id}`} key={index}>
                <img
                  className="aspect-square object-cover"
                  src={post.post.imageUrl}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Liked">
          <div className="grid grid-cols-3 gap-2">
            {user?.liked?.map((post: any, index: number) => (
              <Link to={`/posts/${post.$id}`} key={index}>
                <img
                  className="aspect-square object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

import { Suspense } from 'react';

import { formatDate } from '@/lib/utils';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';

import { Skeleton } from "@/components/ui/skeleton";

import View from '@/components/View';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    if (!post) {
        return notFound();
    }
    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>

                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                            {Boolean(post?.author?.image) && <Image src={post.author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />}
                            {Boolean(post.author.name && post.author.username) ? (
                                <div>
                                    <p className="text-20-medium">
                                        <span className="text-blue-500 hover:underline cursor-pointer">{post.author.name}</span>
                                    </p>
                                    <p className="text-16-medium !text-black-300">
                                        <span className="text-blue-500 hover:underline cursor-pointer">@{post.author.username}</span>
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-20-medium">
                                        <span className="text-blue-500 hover:underline cursor-pointer">Author: {post.author.email}</span>
                                    </p>
                                </div>
                            )}
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {post.pitch}
                </div>

                <hr className="divider" />

                {/*  TODO: EDITOR SELECTED STARTUPS */}

                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    );
};

export default Startup;

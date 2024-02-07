"use client";

import CustomCard from "@/components/landing-page/custom-card";
import TitleSection from "@/components/landing-page/title-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Pencil1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:5000/tasks");
      if (data) {
        setUser(data);
      }
    };
    getData();
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    const getData = async () => {
      const { data } = await axios.get("http://localhost:5000/tasks");
      if (data) {
        setUser(data);
      }
    };
    getData();
  };
  return (
    <section
      className="overflow-hidden
  px-4
  sm:px-6
  mt-10
  sm:flex
  sm:flex-col
  gap-4
  md:justify-center
  md:items-center"
    >
      <TitleSection
        title="To-Do"
        pill="✨Next.js + Nest.js"
        subheading="Next.js + Tailwind CSS"
      />
      <div
        className="bg-white
          p-[2px]
          mt-6
          rounded-xl
          bg-gradient-to-r
          from-primary
          to-brand-primaryBlue
          sm:w-[300px]
        "
      >
        <Link href={"/add"}>
          <Button
            variant="secondary"
            className=" w-full
            rounded-[10px]
            p-6
            text-2xl
            bg-background
          "
          >
            Add Task
          </Button>
        </Link>
      </div>

      <div
        className="mt-20
          px-4
          sm:px-6 
          flex
          flex-wrap
          justify-center
          gap-4
          overflow-x-hidden
          overflow-visible
        "
      >
        {user?.map((testimonial, index) => (
          <CustomCard
            key={testimonial.id}
            className="w-[500px]
                  shrink-0s
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
            cardHeader={
              <div
                className="flex
                      items-center
                      gap-4
                  "
              >
                <Avatar>
                  <AvatarImage src={`/${testimonial.imageUrl}`} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-foreground">
                    {testimonial.title}
                  </CardTitle>
                  <CardDescription className="dark:text-washed-purple-800">
                    {testimonial.status ? "Complted" : "Pending"}
                  </CardDescription>
                </div>
              </div>
            }
            cardContent={
              <p className="dark:text-washed-purple-800">
                {testimonial.description}
              </p>
            }
            cardFooter={
              <div className="flex items-end justify-end gap-4 ">
                <Button
                  variant={"destructive"}
                  onClick={() => deleteHandler(testimonial.id)}
                >
                  Delete
                </Button>
                <Link href={`/${testimonial.id}`}>
                  <Button variant="outline" className="w-15">
                    <Pencil1Icon className="h-4 w-6" />
                    Edit
                  </Button>
                </Link>
              </div>
            }
          ></CustomCard>
        ))}
      </div>
    </section>
  );
};

export default Home;

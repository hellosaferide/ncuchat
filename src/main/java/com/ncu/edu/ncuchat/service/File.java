package com.ncu.edu.ncuchat.service;

import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;

@Service
public class File {
    public static void writeMethod(String content){
        String fileName="C:\\chats.txt";
        try{
            FileWriter writer=new FileWriter(fileName);
            writer.write(content);
            writer.close();
        }catch (IOException e){
            System.out.println("error");
        }

    }
}

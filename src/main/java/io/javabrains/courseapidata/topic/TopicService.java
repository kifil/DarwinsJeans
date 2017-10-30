package io.javabrains.courseapidata.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//marks this as a singleton service
@Service
public class TopicService {

    //for dependency injection
    @Autowired
    private TopicRepository topicRepository;

    public List<Topic> getAllTopics(){

        List<Topic> topics = new ArrayList<>();
        topicRepository.findAll()
                .forEach(topics::add); //fancy lambda syntax
                //.forEach(topic -> topics.add(topic));
        return topics;
    }

    public Topic getTopic(String id){
        return topicRepository.findOne(id);
    }

    public void addTopic(Topic topic){
        topicRepository.save(topic);
    }

    public void updateTopic(String id, Topic topic){
        topicRepository.save(topic);
    }

    public void deleteTopic(String id){
        topicRepository.delete(id);
    }
}

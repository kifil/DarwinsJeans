package io.javabrains.courseapidata.topic;

import org.springframework.data.repository.CrudRepository;

//since we have the apache derby in the dependencies, it knows we should use that
public interface TopicRepository extends CrudRepository<Topic,String> {
    //crud repository gets basic crud operations for free!
}

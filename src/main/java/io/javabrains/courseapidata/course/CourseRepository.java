package io.javabrains.courseapidata.course;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface CourseRepository extends CrudRepository<Course,String> {

    //naming convention allows spring to automatically implement method
    //filtering by topic.id not topicid
    public List<Course> findByTopicId(String topicId);
}

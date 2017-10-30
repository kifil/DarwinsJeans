package io.javabrains.courseapidata.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//marks this as a singleton service
@Service
public class CourseService {

    //for dependency injection
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses(String topicId){

        List<Course> courses = new ArrayList<>();
        courseRepository.findByTopicId(topicId)
            .forEach( c -> courses.add(c));
        return courses;
    }

    public Course getCourse(String id){
        return courseRepository.findOne(id);
    }

    public void addCourse(Course course){
        courseRepository.save(course);
    }

    public void updateCourse(String id, Course course){
        courseRepository.save(course);
    }

    public void deleteCourse(String id){
        courseRepository.delete(id);
    }
}

json.students do
  @students.each do |student|
    json.set! student.id do
      json.partial! 'student', student: student
    end
  end
end
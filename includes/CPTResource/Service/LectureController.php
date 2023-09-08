<?php
declare(strict_types=1);
namespace Adeptivity\Service\Controller;

use Adeptivity\Model\Meta\Grade;
use Adeptivity\Model\Meta\Video;
use Adeptivity\Model\MetaType\VideoType;

class LectureController
{

  private array $uploadedFile;

  private int $lectureId;
  private \WP_Post $lecture;

  private Video $video;
  private Grade $grade;
  private string $status;

  public function saveOrUpdateLecture(int $lectureId, \WP_Post $lecture, bool $update): void
  {
    $this->lectureId = $lectureId;
    $this->lecture = $lecture;
    $this->video = new Video($lectureId);
    $this->grade = new Grade($lectureId);
    $this->status = $this->lecture->post_status;

    $this->saveLecture();
  }

  private function saveLecture(): void
  {

    if (!empty($_FILES['file'])) {
      $this->uploadedFile = $_FILES['file'];
      $this->saveFile();
      $this->video->updateValue();
    } 

    $savedVideo = $this->video->retrieveValue();
    $isVideoValid = $this->validateVideoValue($savedVideo);
    $savedGrade = $this->grade->retrieveValue();
    $isGradeValid = $this->validateGradeValue($savedGrade);

    if ($isGradeValid && $isVideoValid) {
      $this->status = 'publish';
    }

    if ($this->status !== $this->lecture->post_status) {
      wp_update_post($this->lecture, true);
    }

  }

  private function saveFile()
  {
    try {
      switch ($this->uploadedFile['error']) {
        case UPLOAD_ERR_OK:
          break;
        case UPLOAD_ERR_NO_FILE:
          throw new \Exception('No File uploaded');
        case UPLOAD_ERR_INI_SIZE:
          throw new \Exception('File too large');
        default:
          throw new \Exception('An Error Occured');
      }

      if ($this->uploadedFile['size'] > VideoType::ALLOWED_SIZE) {
        throw new \Exception('File too large');
      }

      $finfo = finfo_open(FILEINFO_MIME_TYPE);
      $mimeType = finfo_file($finfo, $this->uploadedFile['tmp_name']);
      if (!in_array($mimeType, VideoType::MIME_TYPES)) {
        throw new \Exception("Invalid file type");
      }

      $pathinfo = pathinfo($this->uploadedFile['name']);
      $base = $pathinfo['filename'];
      $base = preg_replace('/[^a-zA-Z0-9_-]/', '_', $base);
      $base = 'user_' . get_current_user_id() . '_' . $base;
      $filename = $base . "." . $pathinfo['extension'];
      $filename = sanitize_file_name($filename);

      $destination = dirname(ABSPATH) . '/uploads-adep/' . $filename;

      $i = 1;
      while (file_exists($destination)) {
        $filename = $base . "-$i." . $pathinfo['extension'];
        $destination = dirname(ABSPATH) . '/uploads-adep/' . $filename;
        $i++;
      }

      if (!move_uploaded_file($this->uploadedFile['tmp_name'], $destination)) {
        throw new \Exception("unable to move the file");
      }


      $this->video->setValue($filename);

    } catch (\Exception $e) {
      error_log($e->getMessage());
    }
  }

 
  private function validateGradeValue(string $gradeValue) : bool 
  {
    return is_numeric($gradeValue);
  }
 
  private function validateVideoValue(string $videoValue) : bool 
  {
    return !empty($videoValue);
  }
}